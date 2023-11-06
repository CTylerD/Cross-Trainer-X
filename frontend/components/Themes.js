export default function Theme(theme){
    if(theme == 'default'){
        return ({
            color:'black',
            font:{
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
            color: 'hotpink',
            font:{
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
            color: 'lightgreen',
            font:{
            fontFamily:'ShadowsIL',
            color:'darkgreen'
            },
            button:{
                backgroundColor:'wheat'
            }
        })
    }
}