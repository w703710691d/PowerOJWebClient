<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <div class="copyright">
      ©Copyright 2019
        西南科技大学信息工程学院ACM实验室<br>
      <a href="http://git.oschina.net/power/oj/commits/master" target="balnk">PowerOJ Rev.c9b4792ba
</a>
    </div>
    <ul class="footer-links">
      <li><a href="https://github.com/power721/oj" target="balnk">Source</a></li>
      <li class="muted">·</li>
      <li><a href="faq">F.A.Q</a></li>
      <li class="muted">·</li>
      <li><a href="contact">Contact</a></li>
      <li class="muted">·</li>
      <li><a href="changelog">Changelog</a></li>
    </ul>
    <form class="form-inline">
    <label class="select">
      Select Style: <select class="input-medium" id="selstyle">
      <option value="original">Original</option>
      <!--<option value="amelia">Amelia</option>-->
      <!--<option value="cerulean">Cerulean</option>-->
      <!--<option value="cosmo">Cosmo</option>-->
      <!--<option value="cyborg">Cyborg</option>-->
      <!--<option value="darkening">Darkening</option>-->
      <!--<option value="flatly">Flatly</option>-->
      <option value="journal">Journal</option>
      <option value="metro">Metro</option>
      <option value="readable">Readable</option>
      <option value="simplex">Simplex</option>
      <!-- <option value="slate">Slate</option> -->
      <option value="spacelab">Spacelab</option>
      <option value="spruce">Spruce</option>
      <!-- <option value="superhero">Superhero</option> -->
      <option value="todc">Google</option>
      <option value="united">United</option>
    </select>
    </label>
    <label class="checkbox"> <input type="checkbox" id="selwidth">Fluid
      Width?</label>
  </form>

    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
<style lang="less" scoped>
.copyright {
    line-height: 39px;
    text-align: center;
    border-top: 1px solid #ccc;
}
ul {
    padding: 0;
    margin: 0 0 10px 25px;
    list-style-type: disc;
}
* {
    overflow-wrap: break-word;
}
form {
    margin: 0 0 20px;
}
ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
a {
    color: #08c;
    text-decoration: none;
}
li {
    line-height: 20px;
}
.footer-links li {
    display: inline-block;
    height: 59px;
    padding: 10px 5px;
}
</style>