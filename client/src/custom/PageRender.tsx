import { useParams } from "react-router-dom";
import NotFound from "../components/global/NotFound";
import React from "react";
import { IParams } from "../utils/TypeScript";

const generatePage = (pageName: string) => {
    const component = () => require(`./pages/${pageName}`).default;
    try {
        return React.createElement(component());
    } catch (error: any) {
        return <NotFound />;
    }
}

const PageRender = () => {
    const { page, slug }: IParams = useParams();
    let pageName: string = '';
    if (page) {
        pageName = slug ? `${page}/[slug]` : `${page}`
    }

    return pageName;
}

export default PageRender;