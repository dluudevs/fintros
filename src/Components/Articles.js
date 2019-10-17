import React, { useEffect, useState } from 'react';
import { metascrape } from '../metascrapper/metascrapper';
import InfiniteScroll from 'react-infinite-scroller';

const Articles = () => {

    const [meta, setMeta] = useState([]);
    const [artId, setArtId] = useState([]);
    const [limit, setLimit] = useState(30)

    // get all the meta data, store it in state.
        // only store in state when all the meta data has returned
    //in return call show articles only if meta data has items
    // useeffect, only run show articles if the amount of items to be rendered changes

    // **the data is expected to load really slowly.. cant think of another way to do this while limiting 30 items


    const loader = (
        <div className="loading font_grey">
            <p>Fetching Articles ... </p>
        </div>
    )

    const showArticles = (articles = meta) => {

        const results = articles.splice(0, limit).map(({ description, title, image, id, url }, index) => {
            return (
                <div key={id} data-id={index} className="article">
                    <div className="article__img_container">
                        <img src={`${image}`} alt={`${title} article`} />
                    </div>
                    <div className="article__text_container">
                        <h4 className="news font_grey">News</h4>
                        <h3 className="title"><a target="_blank" href={url}>{title}</a></h3>
                        <p className="description">{description}</p>
                    </div>
                </div>
            )
        });
        return results;
    }

    const getArticleMeta = async (ids = artId) => {

        console.log('getArticleMeta called')

        // const results = [];
        // let index = 0;

        const articleIds = ids.map(id => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
                .then(res => res.json())
                .then(article => article != null && article)
        })

        const articles = await Promise.all(articleIds)

        const meta = []
        for(const a of articles){
            if(a.url){
                const metaData = await metascrape(a);

                if(meta.length < 30){
                    if (metaData) {
                        const url = a.url
                        const title = a.title
                        const id = a.id

                        meta.push({ ...metaData, url, title, id })
                        console.log({ ...metaData, url, title, id })
                    }
                } else {
                    break //exit loop when there are 30 items in the array
                }
            }
        }

        console.log(meta)

        // why does the above work better than the below
        // now have to keep track of the amount of items looped from articles, splice the ids and set it to state

        // setMeta(meta)

        // const fetchArticles = (id) => {
        //     return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?&print=pretty`)
        //         .then(res => res.json())
        //         .then(article => {
        //             scrapeMeta(article);
        //             index++; //index must be incremented here to keep pulling items from array
        //         })
        // }

        // const scrapeMeta = async (article) => {
        //     if (article) { //if object, pass to metascrape
        //         const meta = await metascrape(article);
        //         if (meta) {
        //             const url = article.url
        //             const title = article.title
        //             const id = article.id
        //             setMeta(oldMeta => [...oldMeta, { ...meta, url, title, id }]) //loop ends when there are 30 items
        //         }
        //     }
        // }

        // while (results.length < 30) {
        //     await fetchArticles(articles[index]); //wait for loop to complete 
        // }

        // setArtId(oldId => oldId.splice(index, oldId.length)) //remove items that were search from articleId
        // setMeta(oldMeta => [...oldMeta, ...results.splice(0, 30)]);

    }

    useEffect(() => {
        const getArticles = async () => {

            const articleIds = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?&print=pretty') //await for results array before iterating
                .then(id => id.json())

            // setArtId(articleIds);
            getArticleMeta(articleIds);
        }

        getArticles();

    }, [])

    useEffect(() => {
        console.log(artId)
    }, [artId])

    useEffect(() => {
        console.log('meta updated')
        console.log(meta)
    }, [meta])

    return (
        <section className="wrapper">
            <div className="article_container">
                
                <button onClick={() => getArticleMeta()}>Load More</button>
            </div>
        </section>
    )
}

// { meta.length > 30 ? showArticles() : loader }

export default Articles;

// <InfiniteScroll
//     pageStart={0}
//     loadMore={getArticleMeta}
//     hasMore={true}
//     loader={loader}
//     key={'is1'}
// >
//     {
//         showArticles(meta)
//     }
// </InfiniteScroll>