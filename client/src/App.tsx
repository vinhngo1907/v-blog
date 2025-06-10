import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Alert } from "./components/alert/Alert";
import Header from "./components/global/Header";
import PageRender from "./custom/PageRender";
import Footer from "./components/global/Footer";
import { refreshToken } from './redux/actions/authAction';
import { getHomeLogs } from './redux/actions/blogAction';
import { getCategories } from './redux/actions/categoryAction';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
        dispatch(refreshToken());
        dispatch(getHomeLogs());
    }, [dispatch]);

    return (
        <div className="container">
            <Router>
                <Alert />
                <Header />
                <Switch>
                    <Route exact path="/" component={PageRender} />
                    <Route exact path="/:page" component={PageRender} />
                    <Route exact path="/:page/:slug" component={PageRender} />
                </Switch>
                <Footer />
            </Router>
        </div>
    )
}

export default App;