export default function Theme(theme){
    if(theme == 'default'){
        return ({
            container:{
                backgroundColor:'grey'
            },
            text:{
                fontFamily:'Georgia',
                color:'white'
                },
            button:{
                backgroundColor:'mediumblue'
            },
            card:{
                backgroundColor:'dimgray'
            }
        })
    }
    else if(theme == 'pink'){
        return({
            container:{
                backgroundColor: 'mistyrose'
            },
            text:{
            fontFamily:'Poppins',
            color:'indianred'
            },
            button:{
                backgroundColor:'linen'
            },
            card:{
                backgroundColor:'pink'
            }
        })
    }
}