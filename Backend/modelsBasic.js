/*chaye mera student login kr rha ho ya instructor ui same tha login and sign up ka  
to kya me in dono ko user ki entity ke andr dal skta hu


user ka model hoga ,isme me btana chuga kn kn sa data hoga ,and type of data

UserModel{

firstname
lastname
email
password
confirm password
account type -> yaha enum define krnge ki account ka type student hoga ya instructor hoga

ye to wo data ha jo hmko hmre ui se mil gya ha

- ek page dekha tha edit profile ka usme data tha ap cho to fill kr kste ho wrna ni 
profile ka data user se link to krega na 
hum additional data ki jgha us data ka refrence store kr denge

additionalData -> we store ref of profile Model

har ek user multiple courses se linked hoga

courses me mene web dev buy kr rkha ha app dev 
to bhut sri chije ha isme to ye ek object ho skta ha

Courses title hoga dec hoga ye apne ap me ek model ban skta ah to  
iska ref store kra lenge hm

Courses -> ref [Course ] courses bhut sare ho skte ha iislie array ki need pdegi

image -> user ki image 

courseProgress -> mere pass multiple courses ha kis course ki kya progress chl rhi ha ,mene k kn si vid dekhi ha kn kn si ni dekhi
again mene ek refrnece bana dia [courseProgress] name ka bhut sare course ho skte ha to ek array bana lia

}


// ! mene additionl detil name ki ek filed bnayi ha jsime mene profile ka ref store kia ha to ab profile ka model bnaynga

Profile{
gender -> gender kya ha male ya female,
dob ->
pNo->
about-> user ke bare me 

ye wo detials ha jinko hm sign up krte wqt nhi mang rhe ha 
signup krne ke bad agr user in data ko add krna chye to wo kr skta ha

}



// ! CourseProgress

courseProgress{
    courseId -> konse course ki bat kr rhe ho app ,
    

    completed videos -> kisi bhi course ke andr content ha usme multiple section ha uske andr multiple subsection ha

    har ek subsection ek video drshata ha

    hum ek array bana lenge videos ka aur videos hm kese drsha rhe ha subsection ke thurgh

    ref : [subsection]

    jha bhi video ki bt hogi mtlb subsection ki bt hogi
}


// ! subsectionModel

subsection{
    subsection ke vide ha right 

    title-> vidoe ka title kya ha
    time durtin ->
    description->
    videoUrl ->
}


// ! Course 
ek course ek andr bhut  sare coure ho skte ha

name-> course name
desc->course decription 
instuctor -> isntructor kn ha wo user ha to user ka refrence ajyaga
what you willrlern->

courseContent isme sare sections and subsections ka data ajyga
ekcourse content me multiple sections hote ha aur ek sectin me multile subsections hote ha

coureseContent [ref :section]

ratingAndrewies -> course ki rating [ref:ratingandrewies]

price
thumbnail
tags = [ref : tag]
student enrolled = [ref :user]
// kis typ ke studnet enroll kr skte ha user typ ke


// ! section -> 
iske andr multiple subsection hote ha har subsection ko ek video drshati ha

section{
    sectinName -> section ka anme,
    subsection : ref [subsection] multiple subsection
}


// !rating and reviws

ratingandreviews{
    user :ref[user]
    rating:
    review
}


// !tag 
tag{
    name
    decsription
    course : ref course
}

*/