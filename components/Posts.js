import React from 'react'
import { graphql, gql } from 'react-apollo'
import { Card, Avatar, Spin, Badge, Timeline, Button, Tag, Popover, Icon } from 'antd'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { Motion, spring } from 'react-motion' 

const state = observable({
    description: false
})
const postsQuery = gql`
    query postsQuery {
        posts {
            id
            title
            content
            likes
            dislikes
            user {
                id
                name
            }
            comments {
                id
                content
                user {
                    name
                }
            }
            tags {
                id
                name
            }
        }
    }
`
const cardExtra = (author) => (
        <span style={{  }}>
            <span style={{ height: 50, display: 'inline-block', verticalAlign: 'top' }}>
                {author}
            </span>
            <Avatar 
            style={{ marginTop: 7, marginLeft: 5 }}
            icon="user" />
        </span>
)
const cardTitle = (title) => (
    <span style={{ marginLeft: 5 }}>
        <span>
            <Badge status="processing"/>           
        </span>
        <span>{title}</span>
    </span>
)
class Post extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: false,
            comments: false
        }
    }
    render() {
        const state = this.state
        const { post } = this.props
        return (
            <Card 
            style={{ marginTop: 10 }} 
            title={cardTitle(post.title.toUpperCase())}
            extra={cardExtra(post.user.name)}
            key={post.id}
            >   
                <div style={{ marginBottom: 10 }}>
                    <span>
                        {console.log(post.tags)}
                        {post.tags.map(tag => (
                            <Tag><Icon type="tag" /> {tag.name}</Tag>
                        ))}
                    </span>
                    <span style={{ float: 'right', marginBottom: 10 }}>
                        <Popover content={ state.description ? 'Close description': 'Show description' }>
                        <Button
                        className="animation-fade-in" 
                        onClick={() => this.setState({ description: !state.description }) } 
                        icon={state.description ? 'menu-unfold' : 'menu-fold' }
                        />
                        </Popover>
                    </span>                       
                </div>
                <div style={{ display: 'inline-block', width: state.description ? '50%' : '100%' }}>
                <img
                    className={state.description ? 'animation-fade-in-right': 'animation-fade-in' }
                    style={{ minWidth: 200, width: '100%', maxHeight: 400 }} 
                    src="http://fakeimg.pl/350x200/ff0000,128/000,255" 
                    />
                </div>
                
                    {state.description ? (
                        <div className="post-description">
                            {post.content}
                        </div>
                    ): ''}
                <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', marginTop: 20, textAlign: 'left' }}>
                    <span>
                    <Badge  style={{ backgroundColor: '#87d068' }} count={post.likes} overflowCount={9999}>
                        <Button style={{ backgroundColor: true ? 'transparent': '#87d068' }} shape="circle" icon="like" size="large" />
                    </Badge>
                    </span>

                    <span style={{ marginLeft: 30 }}>
                        <Badge count={post.dislikes} overflowCount={9999}>
                            <Button style={{ backgroundColor: true ? 'transparent': '#f04134' }} 
                            shape="circle" icon="dislike" size="large" />
                        </Badge>
                    </span>
                    <span style={{ marginLeft: 30 }}>
                        <Badge style={{ backgroundColor: '#108ee9' }} count={post.comments.length}>
                            <Button
                            style={{ backgroundColor: !state.comments ? 'transparent': '#108ee9', color: state.comments ? 'white' : '#595959' }}
                            size="large" 
                            icon={state.comments ? 'up': 'down' }
                            shape="circle"
                            onClick={() => this.setState({ comments: !state.comments })}
                            />
                        </Badge>
                    </span>
                </div>
                <Comments comments={post.comments} show={state.comments} />
            </Card>
        )
    }
}
const Comments = ({ show, comments }) => {
    if(!show) {
        return (
            <div></div>
        )
    }
    return (
        <div className="animation-bounce-in" style={{ width: '100%', textAlign: 'left', padding: 10, backgroundColor: '#108ee9', marginTop: 10 }}>
            {comments.map(comment => (
                <div key={comment.id} style={{ backgroundColor: 'white', marginTop: 5, border: '1px solid black', padding: 2 }}>
                    <div style={{ paddingLeft: 5 }}>
                        <span>
                        <b><Icon type="user"/> {comment.user.name}</b>
                        </span>
                    </div>
                    <div style={{ paddingLeft: 20 }}>
                        {comment.content}
                    </div>
                </div> 
            ))}
            <div style={{ marginLeft: 10, marginTop: 5 }}>
                <a href="" style={{ color: 'white' }}><Icon type="plus"/> Load more</a>
            </div>  
        </div>
    )
}
const Posts = observer(({ data: { posts, loading }}) => {
    if(loading) {
        return (
            <Spin style={{ width: '100%' }} size="large" />
        )
    }

    return (
        <div>
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    )
})

export default graphql(postsQuery)(Posts)