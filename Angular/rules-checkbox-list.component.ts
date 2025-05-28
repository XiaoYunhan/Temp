import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CheckboxItem {
  id: string;
  label: string;
  checked: boolean;
  indentLevel?: number;
}

interface CheckboxColumn {
  id: string;
  title: string;
  canCollapse: boolean;
  isCollapsed: boolean;
  items: CheckboxItem[];
  headerCheckbox?: boolean;
  headerChecked?: boolean;
}

@Component({
  selector: 'app-rules-checkbox-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rules-checkbox-list.component.html',
  styleUrls: ['./rules-checkbox-list.component.scss']
})
export class RulesCheckboxListComponent {
  @Input() columns: CheckboxColumn[] = [];
  @Output() selectionChange = new EventEmitter<any>();

  ngOnInit() {
    // Initialize with sample data if no input provided
    if (this.columns.length === 0) {
      this.columns = this.getSampleData();
    }
  }

  toggleColumn(column: CheckboxColumn): void {
    if (column.canCollapse) {
      column.isCollapsed = !column.isCollapsed;
    }
  }

  onHeaderCheckboxChange(column: CheckboxColumn): void {
    if (column.headerCheckbox && column.headerChecked !== undefined) {
      // Check/uncheck all items in the column
      column.items.forEach(item => {
        item.checked = column.headerChecked!;
      });
      this.emitSelectionChange();
    }
  }

  onItemCheckboxChange(column: CheckboxColumn, item: CheckboxItem): void {
    // Update header checkbox state if applicable
    if (column.headerCheckbox) {
      const allChecked = column.items.every(i => i.checked);
      const someChecked = column.items.some(i => i.checked);
      
      if (allChecked) {
        column.headerChecked = true;
      } else if (someChecked) {
        column.headerChecked = false; // You might want to use indeterminate state here
      } else {
        column.headerChecked = false;
      }
    }
    this.emitSelectionChange();
  }

  private emitSelectionChange(): void {
    const selection = this.columns.map(column => ({
      columnId: column.id,
      title: column.title,
      selectedItems: column.items.filter(item => item.checked)
    }));
    this.selectionChange.emit(selection);
  }

  private getSampleData(): CheckboxColumn[] {
    return [
      {
        id: 'client-readiness',
        title: 'Client Readiness',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: true,
        headerChecked: false,
        items: [
          { id: 'aml-kyc', label: 'AML/KYC', checked: false },
          { id: 'lei', label: 'LEI', checked: false }
        ]
      },
      {
        id: 'trading-profile',
        title: 'Trading Profile',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: true,
        headerChecked: false,
        items: [
          { id: 'equities', label: 'Equities', checked: false },
          { id: 'ficc', label: 'FICC', checked: false },
          { id: 'terms-business', label: 'Terms Of Business', checked: false },
          { id: 'mifid-classification', label: 'MiFID II Classification', checked: false },
          { id: 'best-execution', label: 'Best Execution', checked: false },
          { id: 'local-authority', label: 'Local Authority Opt-Up', checked: false },
          { id: 'futures-options-exec', label: 'Futures & Options Execution', checked: false, indentLevel: 1 },
          { id: 'futures-options-clearing', label: 'Futures & Options Clearing', checked: false, indentLevel: 1 },
          { id: 'emir-classification', label: 'EMIR Classification', checked: false },
          { id: 'emir-corporate', label: 'EMIR Corporate Sector', checked: false }
        ]
      },
      {
        id: 'global-stay-protocols',
        title: 'Global Stay Protocols',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: false,
        items: [
          { id: 'french-resolution', label: 'French Resolution Stay', checked: false },
          { id: 'uk-resolution', label: 'UK Resolution Stay', checked: false },
          { id: 'us-resolution', label: 'US Resolution Stay', checked: false },
          { id: 'irish-resolution', label: 'Irish Resolution Stay', checked: false },
          { id: 'japan-resolution', label: 'Japan Resolution Stay', checked: false }
        ]
      },
      {
        id: 'regulatory-margin',
        title: 'Regulatory Margin Rules',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: false,
        items: [
          { id: 'umr', label: 'UMR', checked: false },
          { id: 'umr-pb', label: 'UMR PB', checked: false },
          { id: 'sec-sbs-isda', label: 'Sec SBS ISDA Master Agreement', checked: false },
          { id: 'segregation-initial', label: 'Segregation Initial Margin Notice', checked: false },
          { id: 'sec-umr', label: 'SEC UMR', checked: false },
          { id: 'sec-sbs-umr-vm', label: 'SEC SBS UMR Reg VM Adherence', checked: false },
          { id: 'sec-sbs-umr-im', label: 'SEC SBS UMR Reg IM Adherence', checked: false },
          { id: 'eu-benchmark', label: 'EU Benchmark Regulation', checked: false }
        ]
      },
      {
        id: 'global-reporting',
        title: 'Global Reporting Consent (GCOC)',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: false,
        items: [
          { id: 'mifid-reporting', label: 'MiFID Reporting Consent', checked: false },
          { id: 'emir-reporting', label: 'EMIR Reporting Consent', checked: false },
          { id: 'sftr', label: 'SFTR', checked: false },
          { id: 'cftc-reporting', label: 'CFTC Reporting Consent', checked: false },
          { id: 'sec-sbs-reporting', label: 'SEC SBS Reporting Consent', checked: false },
          { id: 'canada-reporting', label: 'Canada Reporting Consent', checked: false },
          { id: 'hkma', label: 'HKMA', checked: false },
          { id: 'asic', label: 'ASIC', checked: false },
          { id: 'israel', label: 'Israel', checked: false },
          { id: 'nccbr', label: 'NCCBR', checked: false }
        ]
      },
      {
        id: 'external-business',
        title: 'External Business Conduct Rules',
        canCollapse: true,
        isCollapsed: false,
        headerCheckbox: false,
        items: [
          { id: 'cftc', label: 'CFTC', checked: false },
          { id: 'sec-sbs', label: 'Sec SBS', checked: false },
          { id: 'canada', label: 'Canada', checked: false },
          { id: 'emir', label: 'EMIR', checked: false },
          { id: 'emir-reporting-obligation', label: 'EMIR Reporting Obligation', checked: false },
          { id: 'mas-rmr', label: 'MAS RMR', checked: false },
          { id: 'finra-4210', label: 'FINRA 4210', checked: false },
          { id: 'hire-act', label: 'Hire Act', checked: false }
        ]
      }
    ];
  }
}