import React, { useEffect, useState } from 'react';
import { metascrape } from '../metascrapper/metascrapper';

const Articles = () => {

    const [meta, setMeta] = useState([]);

    const showArticles = (articles) => {

        const results = articles.map(({ description, title, image, id, url }) => {
            return (
                <div key={id} data-id={id} className="article">
                    <div className="article__img_container">
                        <img src={`${image}`} alt={`Image for ${title} article`} />
                    </div>
                    <div class="article__text_container">
                        <h4 className="news">News</h4>
                        <h3 className="title"><a href={url}>{title}</a></h3>
                        <p className="description">{description}</p>
                    </div>
                </div>
            )
        });
        return results;
    }

    const getArticleMeta = async (article) => {

        // get 40 article ids
        // scrape all
        // show 30
        
        
        if (article) { //if object, pass to metascrape
            const meta = await metascrape(article);
            if (meta) {
                const url = article.url
                const title = article.title
                const id = article.id
                setMeta(oldMeta => [...oldMeta, {...meta, title, id, url}])
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

    }, [])

    return (
        <section className="wrapper">
            <div className="d-flex article_container">
                {
                    meta.length > 30 ? showArticles(meta) : <p>Fetching Articles ... </p>
                }
            </div>
        </section>
    )
}

export default Articles;