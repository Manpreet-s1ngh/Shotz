
import { v4 as uuidv4 } from 'uuid';


export default{

    name:'savedPosts'
    ,
    title:'Saved Posts'
    ,
    type:'document'
    ,
    fields:[
        {
            name:'savedPostId'
            ,
            title:'Saved Post Id '
            ,
            type:'string',
            initialValue: () => uuidv4(),
            description:'Unique identifier for the saved Post'
        }
        ,
        {
            name:'post'
            ,
            title:'Post'
            ,
            type:'reference'
            ,
            to:[ {type:'post'}],
            description:' The post that is saved'


        },
        {
            name:'user'
            ,
            title:'User',
            type:'reference'
            ,
            to:[ {type:'user'}]
            ,
            description:'The user who saved the Post'


        },

        {
            name:'savedAt'
            ,
            title:'Saved At ',
            type:'datetime'
            ,
            description:'Date and time when the post was saved'

        }
    ]

}