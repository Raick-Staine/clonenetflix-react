import React, { useState, useEffect } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';

export default () => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);

    useEffect(() => {
        const loadAll = async () => {
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            let origials = list.filter((i) => i.slug === 'originals');
            let randomChosen = Math.floor(
                Math.random() * origials[0].items.results.length
            );
            let chosen = origials[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }
        loadAll();
    }, [])

    return (
        <div className='page'>
            {featuredData && <FeaturedMovie item={featuredData} />}

            <section className='lists'>
                {movieList.map((item, key) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>
        </div>
    );
};