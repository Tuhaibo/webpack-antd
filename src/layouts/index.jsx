import React, { Component } from 'React'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import { menuConfig } from './constant';
import {
	DesktopOutlined,
	PieChartOutlined,
	FileOutlined,
	TeamOutlined,
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from '@ant-design/icons';
import './index.scss'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const headerHeight = '64px'
@withRouter
export default class BasicLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
		}
	}
	onCollapse = collapsed => {
		this.setState({ collapsed });
	}
	renderTrigger = () => {
		const { collapsed } = this.state
		if (collapsed) return <MenuUnfoldOutlined style={{ color: '#000' }} />
		return <MenuFoldOutlined style={{ color: '#000' }} />
	}
	onSelect = (item) => {
		console.log(item.key)
		this.props.history.push(item.key)
	}
	renderMenuItem = (config) => {
		return config && config.length && config.map(item => {
			if (item.children && item.children.length) return (<SubMenu
				key={item.path}
				title={
					<span>
						<UserOutlined />
						<span>{item.name}</span>
					</span>
				}
			>
				{this.renderMenuItem(item.children)}
			</SubMenu>)
			return (
				<Menu.Item key={item.path}>
					<PieChartOutlined />
					<span>{item.name}</span>
				</Menu.Item>
			)
		})
	}
	render() {
		// console.log("BasicLayout -> render -> this.props", this.props)
		const { location } = this.props;
		const { pathname } = location;
		console.log("Aside -> render -> this.props", this.props)
		return (
			<Layout className='basic-Layout'>
				<Header className='basic-Layout-header flex-between flex-middle' style={{ height: headerHeight }}>
					<div className="logo " style={{ width: '150px', height: '40px', background: '#ccc' }} />
					<Menu mode="horizontal" defaultSelectedKeys={['1']}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu>
				</Header>
				<Layout className='flex-auto basic-Layout-content' style={{ height: `calc(100vh - ${headerHeight} )` }}>
					<Sider theme="light"
						className={`bg-fff basic-Layout-content-slider ${!this.state.collapsed ? 'sider-trigger-right' : ''}`}
						trigger={this.renderTrigger()}
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}>
						<Menu
							selectedKeys={[pathname]}
							// defaultSelectedKeys={pathname}
							onSelect={this.onSelect}
							mode="inline">
							{this.renderMenuItem(menuConfig)}
							{/* <Menu.Item key="1">
								<PieChartOutlined />
								<span>Option 1</span>
							</Menu.Item>
							<Menu.Item key="2">
								<DesktopOutlined />
								<span>Option 2</span>
							</Menu.Item>
							<SubMenu
								key="sub1"
								title={
									<span>
										<UserOutlined />
										<span>User</span>
									</span>
								}
							>
								<Menu.Item key="3">Tom</Menu.Item>
								<Menu.Item key="4">Bill</Menu.Item>
								<Menu.Item key="5">Alex</Menu.Item>
							</SubMenu>
							<SubMenu
								key="sub2"
								title={
									<span>
										<TeamOutlined />
										<span>Team</span>
									</span>
								}
							>
								<Menu.Item key="6">Team 1</Menu.Item>
								<Menu.Item key="8">Team 2</Menu.Item>
							</SubMenu>
							<Menu.Item key="9">
								<FileOutlined />
							</Menu.Item> */}
						</Menu>
					</Sider>
					<Layout className="p24 basic-Layout-content-content" style={{ height: `calc(100vh - ${headerHeight} )` }}>
						{this.props.children}

					</Layout>
					{/* <Content style={{ height: '1000px', background: 'pink' }}>main content</Content> */}
				</Layout>
				{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
			</Layout>
		)
	}
}



