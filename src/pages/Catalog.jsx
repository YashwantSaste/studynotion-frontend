import React, { useEffect } from 'react'
import CourseSlider from '../components/core/Catalog/CourseSlider'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { apiConnector } from '../services/api_connector'
import { categories } from '../services/api'
import { getCatalogaPageData } from '../services/operations/pageAndComponentData'
import Course_Card from '../components/core/Catalog/Course_Card'
const Catalog = () => {
    
    const { catalogName}= useParams();
    const [catalogPageData, setCatalogPageData]= useState(null);
    const [categoryId, setCategoryId]=useState("");

    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);
  return (
    <div className='text-white'>
        <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog /`}
                    <span className="text-yellow-25">
                        {
                            catalogPageData?.data?.selectedCategory?.name
                        }
                    </span>
                </p>
                <p className="text-3xl text-richblack-5">
                    {
                        catalogPageData?.data?.selectedCategory?.name
                    }
                </p>
                <p className="max-w-[870px] text-richblack-200">
                    {
                        catalogPageData?.data?.selectedCategory?.description
                    }
                </p>
            </div>
        </div>
       <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
       <h1 className='text-2xl font-bold text-richblack-5 lg:text-4xl'>Courses to get you started</h1>
            
           
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
            <p className={`px-4 py-2 cursor-pointer`}>
                Most Popular
            </p>
            <p className={`px-4 py-2 cursor-pointer`}>
                New
            </p>
        </div>
        <div>
            <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
            />
        </div>
         
        </div>
            {/* Section-02 */}
        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div >
                <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>
                    Top Courses in {" "}
                    {
                        catalogPageData?.data?.selectedCategory?.name
                    }
                </p>
                <div>
                    <CourseSlider
                        courses={catalogPageData?.data?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* Section -03 */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <p className='text-2xl font-bold text-richblack-5 lg:text-4xl'>
                    Frequently Bought
                </p>
                <div className='py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    {   
                        catalogPageData?.data?.mostSellingCourses.slice(0,4).map((course,index)=>{
                            return(                               
                                <Course_Card course={course} key={index} height={"h-[400px]"}/>                              
                            )
                        })
                    }
                </div>

                </div>
            </div>
       </div>

    <Footer/>

    </div>
  )
}

export default Catalog