<template>
  <div class="home">
    <div class="page-wrapper">
      <div class="row">
        <div class="col-md-12">
          <h1>Welcome!</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>
<style lang="scss" scoped>
@media (min-width: 768px){
.page-wrapper {
   height:100%;
   width:calc(100% - 250px);
    position: absolute;
    left: 250px;
    top: 50px;
    padding: 30px 30px 30px 30px;
}
}
.page-wrapper {
    background-color: #f5f5f5;
}
@media (max-width: 768px){
  .page-wrapper {
    height:100%;
    width: 100%;
    position: absolute;
    top: 100px;
    padding: 30px 30px 30px 30px;}
    }

</style>
