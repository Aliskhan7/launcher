import React, {useEffect, useState} from 'react';
import {Button, ProgressBar} from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Tooltip,
} from "recharts";
import user from '../../assets/images/user.png'
import {easeCubic} from "d3-ease";



let progressInterval = null;

function Launcher() {
    const [progress, setProgress] = useState(0);
    const [openLoader, setOpenLoader] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [data, setData] = useState([
        {
            name: 'Page A',
            uv: 10,
        },
        {
            name: 'Page B',
            uv: 120,
        },
        {
            name: 'Page C',
            uv: 250,
        },
        {
            name: 'Page D',
            uv: 120,
        },
        {
            name: 'Page E',
            uv: 250,
        }
    ]);


    const updateData = () => {
        const newData = [
            { name: 'Page A', uv: Math.floor(Math.random() * 100) },
            { name: 'Page B', uv: Math.floor(Math.random() * 100) },
            { name: 'Page C', uv: Math.floor(Math.random() * 100) },
            { name: 'Page D', uv: Math.floor(Math.random() * 100) },
            { name: 'Page E', uv: Math.floor(Math.random() * 100) },
        ];
        setData(newData);
    };

    useEffect(() => {
        const updateDataInterval = setInterval(updateData, 1600); // Обновление данных каждые 5 секунд
        return () => clearInterval(updateDataInterval);
    }, []);


    function downHandler(){
        setOpenLoader(true)
        progressInterval = setInterval(() => {
            setProgress(prev => prev + 1);
            setDisabledBtn(true)
        }, 100)
    }

    useEffect(() => {
        if(progress >= 100){
            clearInterval(progressInterval)
        }
    }, [progress]);

    return (
        <div className='bg-launcher'>
            <div className='launcher p-3 d-flex justify-content-between flex-column align-items-end'>
                <Dropdown data-bs-theme="dark">
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        <img src={user} alt="user"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-2">Logged as <a href="#">Philipp</a></Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className='gap-4 d-flex justify-content-between align-items-end'>
                    <div className={`w-100 ${openLoader ? 'd-block' : 'd-none'}`}>
                        <ProgressBar className='progress-bar__custom mb-2' now={progress} label={`${progress}%`}/>
                        <AreaChart width={630} height={60} data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" animationEasing={easeCubic} isAnimationActive={true} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" dot={{ stroke: '#6d10de', strokeWidth: 1 }}/>
                        </AreaChart>
                    </div>
                    <Button disabled={disabledBtn}  className='btn-download px-5 py-4' onClick={downHandler}>Install</Button>
                </div>
            </div>
        </div>
    );
}

export default Launcher;