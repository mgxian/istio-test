<style scoped lang="less">
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  h1 {
    height: 150px;
    img {
      height: 100%;
    }
  }
  h2 {
    color: #666;
    margin-bottom: 200px;
    p {
      margin: 0 0 50px;
    }
  }
  .ivu-row-flex {
    height: 100%;
  }
}
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h1>
                <img src="../images/logo.png">
            </h1>
            <h2>
                <p>istio-test vue app</p>
                <Button type="ghost" @click="handleStart">发射</Button>
                <div v-show="show" class="card-container" style="width:500px;margin:100px auto;display:none">
                    <Card>
                        <div style="text-align:center">
                            <h3>{{message}}</h3>
                        </div>
                    </Card>
                </div>
            </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'iView(vue)----->',
      show: false
    }
  },
  methods: {
    handleStart() {
      axios.defaults.headers.common['x-client'] = 'vue'
      axios
        .get('http://istio-test.will/env')
        .then(function(response) {
          console.log(response)
          this.message = response.message
          this.show = true
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>