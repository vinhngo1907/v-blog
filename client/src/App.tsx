import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Alert } from "./components/alert/Alert";
import Header from "./components/global/Header";
import PageRender from "./custom/PageRender";
import Footer from "./components/global/Footer";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from './redux/actions/authAction';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken())
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