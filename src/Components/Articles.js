import React, { useEffect, useState } from 'react';
import { metascrape } from '../metascrapper/metascrapper'

const Articles = () => {

    const [articles, setArticles] = useState([]);

    const getArticles = () => {
        fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty')
            .then(response => response.json())
            .then(artId => {
                artId.forEach(id => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                    .then(res => res.json())
                    .then(art => {
                        if(art){
                            setArticles(prevArticles => [...prevArticles, art.url])
                        }
                    })
                })
            })
    }

    useEffect(() => {
        getArticles();
        metascrape('https://genevievefiles.blogspot.com/2019/10/what-to-do-what-to-do-privacy-morality.html')
    }, []) //without this argument, useEffect would call getArticles every time setArticles is called



    // have a filter that is always removing the first 30 from the results
        // this should work because the rendered components will already have their data and rendered 
    // have the rendering map method only display 30

    // unless this is just a trick (dom manipulation) to hide information that is already available
    return (
        <div>
            {
                articles.map(url => (
                    <p>{url}</p>
                ))
            }
            <h2>Articles</h2>
        </div>
    )
}

export default Articles;