import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VouchersService } from '../../../services/vouchers.service';
import { voucherDtos } from '../../../model/vouchers.model';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.scss',
})
export class VoucherComponent implements OnInit {
  @Output() dataEvent = new EventEmitter<voucherDtos>();
  constructor(private voucherService: VouchersService) {}
  isPopup: boolean = false;
  arrVoucher: voucherDtos[] = [];
  ngOnInit(): void {
    this.LoadPage();
  }

  closePopup() {
    document.body.style.overflow = 'auto';
    this.isPopup = false;
  }

  LoadPage() {
    this.voucherService.getData().subscribe((response) => {
      this.arrVoucher = response.data;
    });
  }

  ApplyVoucher(item: voucherDtos) {
    this.dataEvent.emit(item);
    this.closePopup();
  }
}
