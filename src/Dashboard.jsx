import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Actions
import { add_widget } from './actions';
import { remove_widget } from './actions';
import { add_category } from './actions';
import toast from 'react-hot-toast';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoopIcon from '@mui/icons-material/Loop';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material';

import { Dialog } from 'primereact/dialog';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import { Dropdown } from 'primereact/dropdown';

const Dashboard = () => {
    // Dialog box :- TO add new widget
    const [visible, setVisible] = useState(false);

    // To ask user whether to remove widget or not
    const [remove_visible, setRemove_visible] = useState(false);

    // To take data for new category
    const [category_visible, setCategory_visible] = useState(false);

    const categories = useSelector((state) => state.category);
    const dispatch = useDispatch();

    // To get the index of selected_widget
    const [selected_widget, setSelected_widget] = useState({});

    // To get data of new_widget
    const [new_widget, setNew_widget] = useState({
        "cat_index": -1,
        "name": "",
        "text": ""
    });

    // TO get the data of new_category
    const [new_category, setNew_category] = useState({
        "name": "",
        "widgets": [
            {
                "name": "",
                "text": ""
            }
        ]
    });

    // console.log(new_widget);

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 640,
                md: 768,
                lg: 1024,
            }
        }
    });

    const [period, setPeriod] = useState('Last 2 days');
    const periods = [
        { name: "Last 2 days" },
        { name: "Last 7 days" },
        { name: "Last month" },
        { name: "Last year" }
    ]

    const handleSave = (e) => {
        e.preventDefault();
        if (new_widget.name === "" || new_widget.text === "") {
            toast.error("Please Enter all the details");
            return
        }
        dispatch(add_widget(new_widget));
        setNew_widget({
            "cat_index": -1,
            "name": "",
            "text": ""
        });
        setVisible(false);
        console.log(categories);
    }

    const handleCategorySave = (e) => {
        e.preventDefault();
        if (new_widget.name === "" || new_widget.text === "" || new_category.name === "") {
            toast.error("Please Enter all the details");
            return;
        }

        const updatedCategory = ({
            ...new_category,
            "widgets": [
                {
                    "name": new_widget.name,
                    "text": new_widget.text
                }
            ]
        });

        dispatch(add_category(updatedCategory));

        setNew_category({
            "name": "",
            "widgets": [
                {
                    "name": "",
                    "text": ""
                }
            ]
        });
        setNew_widget({ "cat_index": -1, "name": "", "text": "" });
        setCategory_visible(false);
        toast.success("Category Added");
    }

    return (
        <>
            <nav className="flex sm:px-6 xs:px-4 py-1 items-center justify-between sm:gap-x-0 xs:gap-x-2 bg-white border border-b-gray-300">
                <div className="flex">
                    <p className="inter lg:text-[16px] md:text-[15px] sm:text-[15px] xs:text-[14px] text-cyan-800 font-bold"><span className="text-gray-500 inter font-light">Home {`>`}</span> Dashboard V2</p>
                </div>
                <div className='sm:flex xs:hidden'>
                    <SearchIcon sx={{ width: { md: 'auto', sm: '22px' } }} className='absolute md:ml-[0.2rem] sm:ml-[1.9rem] top-[7px] text-gray-400' />
                    <input type="text" placeholder="Search" className="border border-sky-300 caret-slate-400 md:w-auto sm:w-[80%] md:mx-0 sm:mx-auto rounded-md md:px-7 sm:px-6 py-0.5 lg:text-[16px] md:text-[15px] sm:text-[15px] xs:text-[12px] outline-none" />
                </div>
                <div className='flex items-center md:gap-x-4 xs:gap-x-2'>
                    <ThemeProvider theme={theme}><NotificationsActiveIcon sx={{ width: { lg: '24px', md: '22px', sm: '20px', xs: '20px' } }} className=' text-gray-400 cursor-pointer' /></ThemeProvider>
                    <ThemeProvider theme={theme}><AccountCircleIcon sx={{ width: { lg: '24px', md: '22px', sm: '20px', xs: '20px' } }} className='text-gray-400 cursor-pointer' /></ThemeProvider>
                    <p className='lg:text-[17px] md:text-[16px] sm:text-[16px] xs:text-[14px]'>Sohel Khan</p>
                </div>
            </nav>

            {/* Search bar for xs devices */}
            <div className='sm:hidden xs:flex mt-6'>
                <SearchIcon sx={{ width: { sm: 'auto' } }} className='absolute mt-1 ml-[5.5%] text-gray-400' />
                <input type="text" placeholder="Search" className="mx-auto w-[90%] px-7 py-[0.15rem] border border-sky-300 caret-slate-400 rounded-md outline-none" />
            </div>

            {/* CNAPP Dashboard */}
            <div className='flex sm:flex-row xs:flex-col xs:gap-y-2 items-center justify-between sm:mt-10 xs:mt-4 sm:px-6 xs:px-4'>
                <h1 className='roboto font-bold sm:self-center xs:self-start lg:text-[20px] md:text-[19px] sm:text-[18px] xs:text-[19px]'>CNAPP Dashboard</h1>
                <div className='flex gap-x-2 sm:self-end xs:self-start'>
                    <button className='flex items-center border border-gray-400 bg-white rounded-md' onClick={() => setCategory_visible(!category_visible)}>
                        <p className='lg:text-[15px] sm:text-[14px] xs:text-[13px] text-gray-500 sm:px-3 xs:px-2 py-0.5 lato-light'>Add <span className='lato-light sm:inline-block xs:hidden'>Category &nbsp;&nbsp;</span>+</p>
                    </button>
                    <button className='flex border border-gray-400 rounded-sm bg-white px-1 py-1'>
                        <ThemeProvider theme={theme}><LoopIcon sx={{ width: { lg: 'auto', md: '19px', sm: '19px', xs: '19px' } }} className='text-gray-500' /></ThemeProvider>
                    </button>
                    <button className='flex items-center border border-gray-400 bg-white rounded-sm px-0.5 py-0.5 '>
                        <ThemeProvider theme={theme}><MoreVertIcon sx={{ width: { lg: 'auto', md: '19px', sm: '19px', xs: '19px' } }} className='text-gray-500' /></ThemeProvider>
                    </button>
                    <div className='flex items-center gap-x-1 px-1 border border-blue-800 bg-white rounded-sm'>
                        <ThemeProvider theme={theme}><AccessTimeIcon sx={{ width: { lg: 'auto', md: '19px', sm: '19px', xs: '19px' } }} className='text-blue-800' /></ThemeProvider>
                        {/* <line className='text-blue-800' /> */}
                        <Dropdown value={period} optionLabel="name" options={periods} onChange={(e) => setPeriod(e.target.value)}
                            placeholder="Last 2 Days" checkmark={false} highlightOnSelect={false} />
                    </div>
                </div>
            </div>

            {categories.map((category, cat_index) => (
                <div key={`cat${cat_index}`} className='flex flex-col mt-6 px-8 bg-sky-100'>
                    <h1 className='roboto font-bold text-[18px]'>{category.name}</h1>

                    {/* Widgets */}
                    <div className='flex flex-row gap-x-4'>

                        {category.widgets.map((widget, index) => (
                            <div key={`widget_${index}`} className='flex flex-col flex-shrink-0 w-[25%] p-2 bg-white border shadow-lg rounded-lg'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='roboto font-bold text-[15px]'>{widget.name}</h1>
                                    <CloseIcon sx={{ width: '20px' }} className='cursor-pointer' onClick={() => { setRemove_visible(!remove_visible); setSelected_widget({ "cat_index": cat_index, "wid_index": index }) }} />
                                </div>
                                <div className='flex justify-center items-center h-full'>
                                    <p className='roboto text-center text-[14px] px-2'>{widget.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* Common for all categories */}
                        <div className='flex flex-shrink-0 w-[25%] h-[200px] bg-white justify-center items-center border shadow-lg rounded-lg'>
                            <button className='flex items-center border border-gray-400 bg-white rounded-md' onClick={() => { setVisible(!visible); setNew_widget({ ...new_widget, "cat_index": cat_index }) }}>
                                <p className='lg:text-[15px] sm:text-[14px] xs:text-[13px] text-gray-500 sm:px-3 xs:px-2 py-0.5 lato-light'>+ Add <span className='lato-light sm:inline-block xs:hidden'>Widget &nbsp;&nbsp;</span></p>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* For New Widget */}
            <Dialog header="Add widget" visible={visible} onHide={() => { setVisible(false); setNew_widget({ "cat_index": -1, "name": "", "text": "" }) }} style={{ width: '30vw' }} >
                <div className='flex flex-col'>
                    <p className='font-bold'>Widget name</p>
                    <input type='text' placeholder='Enter widget name' value={new_widget.name} onChange={(e) => setNew_widget({ ...new_widget, "name": e.target.value })} className='outline-none mt-2 caret-black border px-2 py-0.5' />
                    <p className='mt-2 font-bold'>Widget Description</p>
                    <input type='text' placeholder='Enter description' value={new_widget.text} onChange={(e) => setNew_widget({ ...new_widget, "text": e.target.value })} className='outline-none mt-2 caret-black border px-2 py-0.5' />
                    <button className='mt-4 w-fit px-3 py-0.5 mx-auto font-bold text-gray-800 border rounded-md bg-emerald-300' onClick={handleSave}>
                        Save
                    </button>
                </div>
            </Dialog>

            {/* For removing widget */}
            <Dialog header="" visible={remove_visible} onHide={() => setRemove_visible(false)} >
                <div className='flex flex-col'>
                    <h1 className='font-bold'>Are you sure you want to remove this widget ?</h1>
                    <div className='flex flex-row gap-x-4 mt-4 mb-2 mx-auto'>
                        <button className='px-2 py-0.5 font-bold text-gray-800 rounded-md bg-emerald-300' onClick={() => { dispatch(remove_widget(selected_widget)); setRemove_visible(false); toast.success("Widget Removed") }}>Yes</button>
                        <button className='px-2 py-0.5 font-bold text-gray-800 rounded-md bg-red-400' onClick={() => setRemove_visible(false)}>No</button>
                    </div>
                </div>
            </Dialog>

            {/* To Add new category */}
            <Dialog header="Add category" visible={category_visible} onHide={() => { setCategory_visible(false); setNew_widget({ "cat_index": -1, "name": "", "text": "" }); setNew_category({ "name": "", "widgets": [{ "name": "", "text": "" }] }) }} style={{ width: '30vw' }} >
                <div className='flex flex-col'>
                    <p className='font-bold'>Category name</p>
                    <input type='text' placeholder='Enter category name' value={new_category.name} onChange={(e) => setNew_category({ ...new_category, "name": e.target.value })} className='outline-none mt-2 caret-black border px-2 py-0.5' />
                    <p className='mt-2 font-bold'>Widget Name</p>
                    <input type='text' placeholder='Enter widget name' value={new_widget.name} onChange={(e) => setNew_widget({ ...new_widget, "name": e.target.value })} className='outline-none mt-2 caret-black border px-2 py-0.5' />
                    <p className='mt-2 font-bold'>Widget Description</p>
                    <input type='text' placeholder='Enter description' value={new_widget.text} onChange={(e) => setNew_widget({ ...new_widget, "text": e.target.value })} className='outline-none mt-2 caret-black border px-2 py-0.5' />
                    <button className='mt-4 w-fit px-3 py-0.5 mx-auto font-bold text-gray-800 border rounded-md bg-emerald-300' onClick={handleCategorySave}>
                        Save
                    </button>
                </div>
            </Dialog>
        </>
    )
}

export default Dashboard