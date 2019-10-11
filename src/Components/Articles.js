import React, { useEffect, useState } from 'react';
import {metascrape} from '../metascrapper/metascrapper';

const Articles = () => {

    // get IDs
        // set to state

    // once IDs are in        
        // get URLs
        // metascrape
            // add a counter for each "tested" result

    // append

    const [meta, setMeta] = useState([]);

    const showArticles = (articles) => {
        const results = articles.map(({description, title, image}) => {
            return (
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <img src={`${image}`} alt={`Image for ${title} article`} />
                </div>
            )
        });

        return results;
    }   

    const getArticleMeta = async (article) => {
        if (article) { //if object, pass to metascrape
            const meta = await metascrape(article); 
            if (meta){
                setMeta(oldMeta => [...oldMeta, meta])
            }
        }
    }

    const getArticles = async () => {
        const articleIds = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty') //await for results array before iterating
            .then(id => id.json());

        articleIds.forEach(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                .then(res => res.json())
                .then(article => getArticleMeta(article)) //once each promise is resolved, pass each result to getArticleMeta
        });
    }
    
    useEffect(() => {

        getArticles();

    }, []) //without this argument, useEffect would call getArticles every time setMeta is called

    return (
        <div>
            <h2>Articles</h2>
            {
                meta.length ? showArticles(meta) : <p>Loading ... </p>
            }
        </div>
    )
}

export default Articles;