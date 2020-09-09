<template>
  <v-container id="usermaster" fluid tag="section">
    <base-material-card icon="mdi-card-account-details-outline" class="px-5 py-3">
      <v-data-table :headers="headers"
                :items="items"
                :options.sync="options"
                :server-items-length="total"
                :footer-props="{
                  'items-per-page-options': [10, 20, 50, 100, 200, 300, 400, 500],
                  showFirstLastPage: true,
                }"
                :loading="loading"
                multi-sort
                locale="ja-jp"
                loading-text="読込中"
                no-data-text="データがありません。"
                class="elevation-1">
                <template v-slot:item.name="{ item }">
                  {{ item.name }}
                </template>                
    </v-data-table>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">ID</th>
            <th class="primary--text">氏名</th>
            <th class="primary--text">支店</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>

<script>
  export default {
    name: 'UserMaster',

    data: () => ({
        headers:[""],
        items:[],
    }),
    computed: function(){
        this.items=[{id:1,name:"test",branchName:"東京支店"}]
    }
  }
</script>
