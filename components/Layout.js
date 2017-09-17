import Router from 'next/router'
import Head from 'next/head'
import { Layout, Spin } from 'antd'
import Menu from './Menu'
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'
const { Header, Content, Footer } = Layout

const state = observable({
	loading: false
})

Router.onRouteChangeStart = url => {
	console.log('updated')
	state.loading = true
	
}
Router.onRouteChangeComplete = async url => {
	console.log('completed')
	setTimeout(() => state.loading = false, 1000)
}

const Main = observer(({store, children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel="stylesheet" href="/static/main.css"/>
            <link rel="stylesheet" href="/static/antd.css"/>
        </Head>
        <Layout className="layout">
        <Header>
          	<div className="logo" />
			<Menu />
			{console.log('loading:')}
			{console.log(store.loading)}
        </Header>
		
        <Content style={{ padding: '0 50px' }} >
			
          	<div style={{ background: '#fff', padding: 24, minHeight: 280, marginTop: 30 }}>
			  	{store.loading ? (<Spin style={{ width: '100%' }} size="large" />): children}
          	</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          		Ant Design ©2016 Created by Ant UED
        </Footer>
      	</Layout>
    </div>
))
const WithLoading = (props) => (
	<Main store={state} {...props} />
)
export default WithLoading