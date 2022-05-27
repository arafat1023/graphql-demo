const graphql = require('graphql')
const {GraphQLList} = require("graphql");
const axios = require("axios");
const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema
} = graphql


const MenuItem= new GraphQLObjectType({
    name:'MenuItemType',
    fields:()=>({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
    })

})

const Restaurant = new GraphQLObjectType({
    name:'RestaurantType',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        location:{type:GraphQLString},
        menu:{type:new GraphQLList(MenuItem)},

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        restaurants:{
            type:new GraphQLList(Restaurant),
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue,args){
                return axios.get(`http://localhost:4200/restaurants/${args.id}`)
                    .then(res=>res.data)
            }

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
