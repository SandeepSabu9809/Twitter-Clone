'use client'
import React, { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import News from "./News";

export default function Widgets() {
    const [count, setCount] = useState(3); // Initial count state
    const [articles, setArticles] = useState([]); // State variable to store fetched articles

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json');
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await res.json();
                setArticles(data.articles || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleShowMore = () => {
        setCount(prevCount => prevCount + 3); // Increment count by 3 when the button is clicked
    };

    return (
        <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5 ">
            <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
                <div className="flex items-center p-3 rounded-full bg-red-500 relative ">
                    <SlMagnifier className="h-5 z-50 text-gray-500 " />
                    <input className="absolute inset-0 rounded-full pl-11 border-r-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 " type="text" placeholder="Search Twitter" />
                </div>
            </div>
            <div className="text-gray-700 space-y-3 bg-gray-300 rounded-xl pt-2 w-[90%] xl:w-[75%] ">
                <h4 className="font-bold text-xl p-x-4">What's happening</h4>
                {articles.slice(0, count).map((article, index) => (
                    <News key={index} props={article} />
                ))}
                <button onClick={handleShowMore} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
            </div>
        </div>
    );
}
