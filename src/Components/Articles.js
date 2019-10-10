import React, { useEffect, useState } from 'react';
import {metascrape} from '../metascrapper/metascrapper';

const Articles = () => {

    const [meta, setMeta] = useState([]);

    const getArticleMeta = async (article) => {
        if (article) { //if object, pass to metascrape
            const meta = await metascrape(article); 
            if (meta){
                setMeta(oldMeta => [...oldMeta, meta])
            }
        }
    }

    const getArticles = async () => {
        const articleIds = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty')
            .then(id => id.json());
        // const articleIds = await promiseId.json();

        articleIds.forEach(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                .then(res => res.json())
                .then(article => getArticleMeta(article))
        });
    }
    
    useEffect(() => {

        getArticles();

    }, []) //without this argument, useEffect would call getArticles every time setMeta is called

    // have a filter that is always removing the first 30 from the results
        // this should work because the rendered components will already have their data and rendered 
    // have the rendering map method only display 30

    // unless this is just a trick (dom manipulation) to hide information that is already available
    return (
        <div>
            {
                meta.length ? meta.map(art => (
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