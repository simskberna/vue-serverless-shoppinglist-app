<!-- eslint-disable prettier/prettier -->

<template>
  
    <v-content class="mt-5">
       
        <v-card class="mx-auto mt-16" max-width="500" elevation="2">
         <v-card-title style="color: #b8b8b8"> ADD YOUR TODO ITEMS</v-card-title>
         <v-card-text>
  
          <v-text-field
                :label="'New todo item'"
                @keydown.enter="addNewItem"
                autofocus
                browser-autocomplete="off"
                clearable
                color="primary"
                flat
                hide-details
                maxlength="1023"
                placeholder="What needs to be done?"
                solo
                v-model="newItem"
              ></v-text-field>
         </v-card-text>
         <v-divider></v-divider>
         <v-alert v-if="error" color="pink darken-1" dark>
          {{ error.message }}
        </v-alert>
        <v-divider></v-divider>
         <v-card-actions>
          <v-btn block style="background-color: rebeccapurple;color:white" @click="addNewItem">ADD</v-btn>
          
         </v-card-actions>
         
          <v-list>
            <v-list-item-group>
              
              <v-list-item class="todo-item" v-for="item in listItems" :key="item">
                
                <v-list-item-content>
                  <v-row class="pl-5" 
                  no-gutters
                  style="height: 50px;max-width:500px;justify-content: center;">
                  <v-text-field style="color:red" :value=item.itemName readonly></v-text-field>
                  <v-btn 
                  style="margin:6px"
                  color="red" 
                  @click="deleteItem(item.id)">X</v-btn>
                </v-row>
                </v-list-item-content>
              </v-list-item>
            
            </v-list-item-group>
          </v-list>
     
        </v-card>  
      </v-content>
   
  </template>
  <script>
  import { Auth, API, graphqlOperation} from 'aws-amplify'
  import * as queries from '../graphql/queries';
  import * as mutations from '../graphql/mutations';
  import * as subscriptions from '../graphql/subscriptions';
  export default {
    name: "List",
    data:() =>({
      newItem:"",
      listItems: []
    }),
    async mounted(){ 
      const currentUser = await Auth.currentAuthenticatedUser();
      API.graphql(graphqlOperation(subscriptions.onCreateShoppingListItem,{
        owner:currentUser.username 
      })
      ).subscribe({
        next: action => 
        this.listItems.push(action.value.data.onCreateShoppingListItem)
      });
  
      API.graphql(graphqlOperation(subscriptions.onDeleteShoppingListItem,{
        owner:currentUser.username 
      })
      ).subscribe({
        next: action =>  {
          const id = action.value.data.onDeleteShoppingListItem.id;
          const index = this.listItems.map(item => item.id).indexOf(id);
          this.listItems.splice(index,1);
        }
       
      });
    },
    async created(){  
      const {data} = await API.graphql(
        graphqlOperation(queries.listShoppingListItems)
        );
     
      data.listShoppingListItems.items.forEach(item => {
        this.listItems.push(item);
        
      });
    },
    methods:{
      async addNewItem(){      
        await API.graphql(graphqlOperation(mutations.createShoppingListItem,{
          input: {itemName:this.newItem}
        })
        );
        this.newItem = "" 
      },
      async deleteItem(id){ 
        await API.graphql(graphqlOperation(mutations.deleteShoppingListItem,{
          input: {id:id}
        })
        );
      }
    }
  }
  </script>
  <style>
  
  </style>
  
  