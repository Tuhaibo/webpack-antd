import React, { Component } from 'React'
import { Layout, Menu, Breadcrumb } from 'antd';
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

export default class BasicLayout extends Component {
	constructor(props) {
		super(props)
		this.state = {
			collapsed: false,
		}
	}
	onCollapse = collapsed => {
		console.log(collapsed);
		this.setState({ collapsed });
	}
	renderTrigger = () => {
		const { collapsed } = this.state
		if (collapsed) return <MenuUnfoldOutlined style={{ color: '#000' }} />
		return <MenuFoldOutlined style={{ color: '#000' }} />
	}
	render() {
		return (
			<Layout className='basic-Layout'>
				<Header className='basic-Layout-header' style={{ height: headerHeight }}>
					{/* <div className="logo" /> */}
					{/* <Menu mode="horizontal" defaultSelectedKeys={['1']}>
						<Menu.Item key="1">nav 1</Menu.Item>
						<Menu.Item key="2">nav 2</Menu.Item>
						<Menu.Item key="3">nav 3</Menu.Item>
					</Menu> */}
				</Header>
				<Layout className='flex-auto basic-Layout-content' style={{ height: `calc(100vh - ${headerHeight} )` }}>
					<Sider theme="light"
						className={`bg-fff basic-Layout-content-slider ${!this.state.collapsed ? 'sider-trigger-right' : ''}`}
						trigger={this.renderTrigger()}
						collapsible
						collapsed={this.state.collapsed}
						onCollapse={this.onCollapse}>
						<Menu defaultSelectedKeys={['1']} mode="inline">
							<Menu.Item key="1">
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
							</Menu.Item>
						</Menu>
					</Sider>
					<Layout className="p24 basic-Layout-content-content" style={{ height: `calc(100vh - ${headerHeight} )` }}>
						{/* {this.props.children} */}
						<div className='' style={{ height: '3000px', background: 'red' }}>
							1000pxwwww
						</div>
					</Layout>
					{/* <Content style={{ height: '1000px', background: 'pink' }}>main content</Content> */}
				</Layout>
				{/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
			</Layout>
		)
	}
}


