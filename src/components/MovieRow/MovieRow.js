import React from "react";
import '../MovieRow/MovieRow.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MovieRow = ({ title, items }) => {

    const [scrollX, setScrollX] = React.useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    };
    
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 250;
        if (window.innerWidth - listW > x) {
            x = window.innerWidth - listW - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div className="movieRow-left" onClick={handleLeftArrow}>
                <ArrowBackIosIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow-right" onClick={handleRightArrow}>
                <ArrowForwardIosIcon style={{ fontSize: 50 }} />
            </div>

            <div className="movieRow-listarea">
                <div className="movieRow-list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 250 + 'px',
                }}>
                    {items?.results?.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                                alt={item.original_title || item.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieRow;