'use client'
import React, { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import News from "./News";


export default function Widgets() {
    const [count, setCount] = useState(3); // Initial count state for news
    const [pnum, setPnum] = useState(3); // Initial count state for people
    const [articles, setArticles] = useState([]); // State variable to store fetched articles
    const [people, SetPeople] = useState([]); //State variable to store fetched people    

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json');
                const res1 =await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture');
                if (!res.ok) {
                    throw new Error('Failed to fetch news data');
                }
                if(!res1.ok){
                    throw new Error('Failed to fetch people data');
                }
                const data = await res.json();
                const data1 = await res1.json();
                setArticles(data.articles || []);
                SetPeople(data1.results || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);


    const handleShowMore = () => {
        setCount(prevCount => prevCount + 3); // Increment count by 3 when the button is clicked
    };
    const handleShowMorePeople = () => {
        setPnum(prevCount => prevCount + 3); // Increment count by 3 when the button is clicked
    };

    return (
        <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5 ">
            <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50 ">
                <div className="flex items-center p-3 rounded-full bg-red-500 relative ">
                    <SlMagnifier className="h-5 z-50 text-gray-500 " />
                    <input className="absolute inset-0 rounded-full pl-11 border-r-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 " type="text" placeholder="Search Twitter" />
                </div>
            </div>
            <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] ">
                <h4 className="font-bold text-xl px-4">What's happening</h4>
                {articles.slice(0, count).map((article, index) => (
                    <News key={index} props={article} />
                ))}
                <button onClick={handleShowMore} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
            </div>
            <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%] ">
                <h4 className="font-bold text-xl px-4" >Who to follow</h4>
                {people.slice(0,pnum).map((randomuser) => (
                    <div key={randomuser.login.username} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ">
                        <img className="rounded-full" width={40} src={randomuser.picture.thumbnail} alt="" />
                        <div className="truncate ml-4 leading-5">
                            <h4 className="font-bold hover:underline text-[14px] " >{randomuser.login.username}</h4>
                            <h5 className="text-[13px] text-gray-500 truncate " >{randomuser.name.first + " " + randomuser.name.last }</h5>
                        </div>
                        <button className="ml-auto bg-sky-500 text-white rounded-full text-sm px-3.5 py-1.5 font-bold" >follow</button>
                    </div>
                ))}
                <button onClick={handleShowMorePeople} className="text-blue-300 pl-4 pb-3 hover:text-blue-400">Show more</button>
            </div>
        </div>
    );
}
