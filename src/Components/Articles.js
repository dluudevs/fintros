import React, { useEffect, useState } from 'react';
import { metascrape } from '../metascrapper/metascrapper'

const Articles = () => {

    const [articleUrls, setArticleUrls] = useState([]);
    const [articlesMeta, setMeta] = useState([]);

    const getArticleMeta = (articles) => {
        articles.forEach(metascrape)
    }

    useEffect(() => {
        const getArticlesUrl = async () => {
            const promiseId = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty');
            const articleIds = await promiseId.json();
    
            const promiseArticles = articleIds.map(id => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                    .then(res => res.json())
            });
            
            const articleData = await Promise.all(promiseArticles);
            const articleUrl = articleData.map(async (article) => article && article) //if object exists, add it to array
            Promise.all(articleUrl).then(setArticleUrls)
        }

        getArticlesUrl();

    },[]) //without the empty array argument, useEffect would call getArticles every time setArticles is called


    // have a filter that is always removing the first 30 from the results
        // this should work because the rendered components will already have their data and rendered 
    // have the rendering map method only display 30

    // unless this is just a trick (dom manipulation) to hide information that is already available
    return (
        <div>
        {
            articleUrls.length > 0 && getArticleMeta(articleUrls)
        }
        <h2>Articles</h2>
        {
            articleUrls.length > 0 ? 
            articleUrls.map(art => (
                <div>
                    <p>{art.url}</p>
                </div>
            )) 
            :
            <p>Loading...</p>
        }
        </div>
    )
}

export default Articles;