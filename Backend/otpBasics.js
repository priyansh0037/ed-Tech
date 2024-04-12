/* 

! OTP model 

otp{
    email -> kis emial ko bja gyaha
    createdat ->kb bana ha,expiration time bata skta hu me
    otp ->kya ha 
}

pre and post 

usage of otp -> jb bhi koi vyakti sign up krne ata ha wis ign up kr deta ha uske bad me usko next wali screen dikhata hu jha wo otp uske mail pr aya hota ha  agr us vykti ne valid otp dala ha to me us vyakti ko db me entr krta hu 

otp aya otp sub,mit kia tb tk db me entry ni hui ha 

potp mail pr aya ha pr enrty ni bani ha db me otp submit krne ke bad entry bani ha  kya me keh skta hu doc ban ne se pehle otp wali bat aa rhi ha 

pre post hook hm kha use krte ha schema ke neche model ke upr 

hamre code flow ke according hm pre post mdiileware ka kam otp wale model me krnge

hum pre middleware ka use krnge , details db me save hone se pehle ap otp ka amil bhejo


user -> data entr -> mail page -> otp enter -> submit -> db entry

mail aya db me entry fill krne se pehle to hm pre midddleware ka use krnge 

agr me pre ya psot middleware use krta hu top meko schema ke upr and model ke neche code likhna pdega 


----------------------------------------------------------------
steps to send otp 

user ne sing up kia usko dikhega otp fill krne ka page hmney otp mail kra dia using pre middleware ,so that means ki otp generation wala kam 

hmare sendOtp wale contoller ke andr ho rha hoga 

1) pehle me email le leta hu req ki body se 
2) check kruag ki is email se user  phle se exist to ni krta 
ni krta to otp gen krnege 

3)make sure otp is  unique
    4) otp db me store krna ha why thiis ?  jb user typ krega otp tb match bhi to krna ha ki otp same ha ya ni
    5)then return reesponse

*/