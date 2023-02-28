<template>
  <div>我是後台訂單列表</div>
  <div class="container-fluid mt-3">
    <div class="row">
      <div class="my-4">
        <div class="d-flex justify-content-md-evenly align-items-md-center">
          <h2>訂單明細</h2>
          <div class="ms-auto">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm delOrderAll"
            >
              清除全部訂單
            </button>
          </div>
        </div>
        <div class="">
          <table
            class="table table-responsive-md table-hover table-striped table-bordered border-bottom mb-5"
          >
            <thead>
              <tr>
                <th scope="col" width="8%">訂單編號</th>
                <th scope="col" width="10%" class="pad-none">姓名</th>
                <th scope="col" width="20%" class="pad-none">送達地址</th>
                <th scope="col" width="15%" class="pad-none">電子郵件</th>
                <th scope="col" class="phone-none">訂單品項</th>
                <th scope="col" class="text-center" width="8%">成立日期</th>
                <th scope="col" class="text-center" width="8%">訂單狀態</th>
                <th scope="col" class="text-center pe-3" width="6%">操作</th>
              </tr>
            </thead>
            <tbody
              class="js-orderList fw-light border-bottom table-group-divider"
            >
              <tr>
                <td class="align-middle">2</td>
                <td class="align-middle">
                  <p>Dudu</p>
                  <p>0911123123</p>
                </td>
                <td class="align-middle">台北市重慶南路一段122號</td>
                <td class="align-middle">ray@gamil.com</td>
                <td class="align-middle">3+1 極致素顏面膜</td>
                <td class="align-middle"></td>
                <td class="text-center pe-3 orderStatus align-middle">
                  <a href="#" class="js-status" data-status="已處理" data-id="2"
                    >已處理</a
                  >
                </td>
                <td class="text-center pe-3 align-middle">
                  <input
                    type="button"
                    class="delSingleOrder-Btn js-delete btn btn-outline-secondary btn-sm"
                    value="刪除"
                    data-id="2"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot class="mb-0"></tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
