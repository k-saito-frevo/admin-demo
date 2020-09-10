<template>
  <v-container id="usermaster" fluid tag="section">
    <base-material-card icon="mdi-card-account-details-outline" class="px-5 py-3">
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <div class="text-right">
                <v-btn color="info"  fab small class="mb-2" @click.stop="dialog = true" >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn color="error" fab small class="mb-2" @click.stop="dialog = true"  >
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </div>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">ユーザ追加</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="ID"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field label="名前"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select label="所属支店" :items="branchList"></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-data-table 
            :headers="headers"
            :items="items"
            multi-sort
            locale="ja-jp"
            :loading="load"
            loading-text="読込中"
            no-data-text="データがありません。"
            class="elevation-1"
            :items-per-page=1
            :items-per-page-options= "[5,10, 30, 50, -1]"            
            :page.sync="page"
            @page-count="pageCount = $event"
            hide-default-footer
        >
            <template v-slot:footer>
                <v-pagination 
                    v-model="page" 
                    option
                    circle 
                    :length="pageCount" 
                    :total-visible="7"
                    :prev-icon="prevIcon"
                    :next-icon="nextIcon"
                />
            </template>        
        </v-data-table>
    </base-material-card>
</v-container>
</template>
<script>
  export default {
    name: 'UserMaster',
    data: () => ({
        headers:[],
        items:[],
        prevIcon:'mdi-arrow-left',
        nextIcon:'mdi-arrow-right',
        page:1,
        pageCount:2,
        load:true,
        dialog: false,
        branchList:[
            {value:1,text:"test"},
            {value:2,text:"2"},
            {value:3,text:"tetset"}
        ]
    }),
    created: function(){

        this.items=[
            {id:1,name:"test",branchName:"東京支店"},
            {id:1,name:"tes",branchName:"東京支店"},
            {id:1,name:"aest",branchName:"東京支店"},
            {id:14,name:"test",branchName:"東京支店"},
            {id:2,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
            {id:119,name:"test",branchName:"東京支店"},
        ]
        this.headers=[
            {
                text: 'ID',
                value: 'id'
            },
            {
                text: '氏名',
                value: 'name'
            },
            {
                text: '所属支店',
                value: 'branchName'            
            },
            {
                text: '',
                value: ''
            }
        ]
    },
    methods:{
        close: function(){
            this.load = !this.load;
            this.dialog= false;
        },
        save: function(){
            console.log(this)
            this.load = !this.load;
            this.dialog= false;
        }
    }
  }
</script>
