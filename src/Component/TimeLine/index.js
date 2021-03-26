import React, { useEffect } from "react";
import withState from "../../Utils/HOC/withState";
import Post from "../Post";
import API from "../../actions/API";


export default withState(function TimeLine (props){
    useEffect(()=> {
        API.Post.getAllPosts()(props.dispatch)
    }, [props.dispatch])

    return (
        <div>
            {
                props.posts.map(post => (
                    <div key={post._id}>
                        <Post  {...post.user} postID={post._id} postContent={post.text}/>
                    </div>
                ))
            }
        </div>
    )
})