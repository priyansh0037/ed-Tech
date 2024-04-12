const dispatch = useDispatch()
const {course,editCourse,setCourse} = useSelector((state)=> state.course)
const [loading , setLoading] = useState();
const [courseCategory,setCourseCategory] = useState([])



useEffect(()=>{
    
const getCategories = async()=>{
    setLoading(true)
    const categories  = await fetchCourseCategory();

    if(categories.length > 0){
        setCourseCategory(categories)
    }

    setLoading(false)

    
if(editCourse){
    setValue("courseTitle",course.courseName);
    setValue("courseShortDesc",course.courseDescription);
    setValue("coursePrice",course.price);
    setValue("courseTags",course.tag);
    setValue("courseBenifits",course.WhatYouWillLearn);
    setValue("courseRequirements",course.instructions);
    setValue("courseImage",course.thumbnail);
}

}

getCategories();
},[])

