import React, { useEffect, useState } from 'react';
import { metascrape } from '../metascrapper/metascrapper';

const Articles = () => {

    const [meta, setMeta] = useState([]);
    const [artId, setArtId] = useState([]);

    const showArticles = (articles) => {

        const results = articles.map(({ description, title, image, id, url }, index) => {
            return (
                <div key={id} data-id={index} className="article">
                    <div className="article__img_container">
                        <img src={`${image}`} alt={`${title} article`} />
                    </div>
                    <div className="article__text_container">
                        <h4 className="news font_grey">News</h4>
                        <h3 className="title"><a href={url}>{title}</a></h3>
                        <p className="description">{description}</p>
                    </div>
                </div>
            )
        });
        return results;
    }

    const getArticleMeta = async (articles) => {

        const results = [];
        let index = 0; 
        
        const fetchArticles = (id) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                        .then(res => res.json())
                        .then(article => {
                            scrapeMeta(article);
                            index++; //index must be incremented here to keep pulling items from array
                        })
        }

        const scrapeMeta = async (article) => {
            if (article) { //if object, pass to metascrape
                const meta = await metascrape(article);
                if (meta) {
                    const url = article.url
                    const title = article.title
                    const id = article.id
                    results.push({...meta, url, title, id}) //loop ends when there are 30 items
                }
            }
        }

        while(results.length <= 29){ 
            await fetchArticles(articles[index]); //wait for loop to complete 
        }

        setArtId(oldId => oldId.slice(0, index)) //remove items that were search from articleId
        setMeta(oldMeta => [...oldMeta, ...results]);

    }

    useEffect(() => {
        const getArticles = async () => {
    
            const articleIds = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty') //await for results array before iterating
                .then(id => id.json())
    
            setArtId(articleIds);
            getArticleMeta(articleIds);
        }

        getArticles();

    }, [])

    return (
        <section className="wrapper">
            <div className="d-flex article_container">
                {
                    meta.length ? showArticles(meta) : 
                    (
                        <div className="loading font_grey">
                            <p>Fetching Articles ... </p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}

export default Articles;