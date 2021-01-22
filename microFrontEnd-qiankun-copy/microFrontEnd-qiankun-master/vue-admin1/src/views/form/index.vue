<template>
  <div class="app-container">
    <div id="displayDate" />
    <div style="margin:30px 0 5px 20px">
      <h1>Loan Data Table</h1>
    </div>
    <temp-thead />
  </div>
</template>

<script>
import TempThead from './components/TempThead'

export default {
  name: 'Form',
  components: { TempThead },
  data() {
    return {
      user: '',
      roles: [],
      adminMsg: '',
      customerMsg: ''
    }
  }
}
</script>
