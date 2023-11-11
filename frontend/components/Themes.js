export default function Theme(theme){
    if(theme == 'default'){
        return ({
            container:{
                backgroundColor:'black'
            },
            text:{
                fontFamily:'SpaceMono',
                color:'white'
                },
            button:{
                backgroundColor:'gray'
            }
        })
    }
    else if(theme == 'pink'){
        return({
            container:{
                backgroundColor: 'hotpink'
            },
            text:{
            fontFamily:'BebasNeue',
            color:'black'
            },
            button:{
                backgroundColor:'pink'
            }
        })
    }
    else if(theme == 'green'){
        return({
            container:{
                backgroundColor: 'lightgreen'
            },
            text:{
            fontFamily:'ShadowsIL',
            color:'darkgreen'
            },
            button:{
                backgroundColor:'wheat'
            }
        })
    }
}