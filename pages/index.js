import withData from '../withData'
import Posts from '../components/Posts'
import Layout from '../components/Layout'
export default withData((props) => (
    <Layout >
        <Posts />
    </Layout>
))