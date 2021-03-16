import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withContainer from "../../Utils/HOC/withContainer";
import Login from "../Login";

const Page1 = withContainer(() => (<div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum </div>))
const Page2 = withContainer(() => (<div>Page 2</div>))

const Switcher = (props) => {
    
    return <Switch>
        <Route exact path="/" component={Page1}/>
        <Route path="/page2" component={Page2}/>
        <Route path="/blog-front-end/user" >
            {
                props.isLogged?
                    <Redirect to="/"/>:
                    <Login/>
            }
        </Route>
        <Route path="*" component={()=> <div>404</div>}/>
    </Switch>
}

export default Switcher;