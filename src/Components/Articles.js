import React, { useEffect, useState } from 'react';
import {metascrape} from '../metascrapper/metascrapper';

const Articles = () => {

    const [articles, setArticles] = useState([]);

    const getArticleMeta = async (articles) => {
        const metaPromise = articles.map(art => art && metascrape(art)); //if object, pass to metascrape.
        Promise.all(metaPromise).then((meta) => {
            const metaData = meta.filter(m => m && m) //can't filter undefined/null in metascrape function
            setArticles(metaData);
        })
    }

    const getArticles = async () => {
        const promiseId = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty');
        const articleIds = await promiseId.json();

        const promiseArticles = articleIds.map(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                .then(res => res.json())
        });

        const articleData = await Promise.all(promiseArticles);

        getArticleMeta(articleData)
        
    }


    useEffect(() => {
        getArticles();
    }, []) //without this argument, useEffect would call getArticles every time setArticles is called



    // have a filter that is always removing the first 30 from the results
        // this should work because the rendered components will already have their data and rendered 
    // have the rendering map method only display 30

    // unless this is just a trick (dom manipulation) to hide information that is already available
    return (
        <div>
            {
                articles.length ? articles.map(art => (
                    <div>
                        <p>{art.title}</p>
                        <p>{art.description}</p>
                        <img src={`${art.image}`} alt=""/>
                    </div>
                ))
                :
                <p>Loading ... </p>
            }
            <h2>Articles</h2>
        </div>
    )
}

export default Articles;