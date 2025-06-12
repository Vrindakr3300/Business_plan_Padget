(() => {
  const fieldMap = {
  stduph: 'std_uph',
  existinglines: 'existing_lines',
  MaxShiftAllowanceHours: 'max_shift_allowance_hours',
  PlannedWorkingDays: 'planned_working_days',
  WorkingHours: 'working_hours',
  VarientCO: 'no_of_varient_changeover',
  VarientCOTime: 'varient_changeover_time',
  ModelCO: 'no_of_model_changeover',
  ModelCOTime: 'model_changeover_time',
  PerhourOTCost: 'per_hour_OT_cost',
  std_mp: 'std_mp',
  ramp_up_days: 'ramp_up_days', 
  working_hour_ramp_up: 'working_hour_ramp_up',
  working_hours_ramp_down: 'working_hours_ramp_down',
  shift: 'shift',
  working_hour_opr: 'working_hour_opr',
  support_dl_prod:'support_dl_prod',
  support_dl_QA:'support_dl_QA',
  downtime:'downtime',
  downtime_MES:'downtime_MES',
  downtime_IT: 'downtime_IT',
  no_of_sunday_working: 'no_of_sunday_working',
  sunday_wh: 'sunday_wh'

};


  const sectorsData = {
    "Sector 58": {
      "FAT": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }


      ],
      "CFC": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }
      ]
    },
    "Sector 60": {
      "BE": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }

      ],
      "SMT": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }

      ],
      "FATP": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }

      ]
    },
    "Sector 63": {
      "All Sections": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }

      ]
    },
    "Sector 68": {
      "FATP": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }

      ],
      "SMT": [
        { label: "Plan", name: "plan", type: "number", required: true },
        { label: "Std. UPH", name: "stduph", type: "number", required: true },
        { label: "Existing Lines", name: "existinglines", type: "number", step: "any", required: true },
        { label: "Max. Shift Allowance Hours", name: "MaxShiftAllowanceHours", type: "number", required: true },
        { label: "Planned Working Days", name: "PlannedWorkingDays", type: "number", required: true },
        { label: "Working Hours", name: "WorkingHours", type: "number", required: true },
        { label: "No. of Sunday Working", name: "no_of_sunday_working", type: "number", required: true },
        { label: "Sunday Working Hours", name: "sunday_wh", type: "number", step: "any", required: true },
        { label: "No. of varient C/O", name: "VarientCO", type: "number", required: true },
        { label: "Varient C/O Time", name: "VarientCOTime", type: "number", required: true },
        { label: "No. of model C/O", name: "ModelCO", type: "number", required: true },
        { label: "Model C/O Time", name: "ModelCOTime", type: "number", required: true },
        { label: "Per hour OT Cost", name: "PerhourOTCost", type: "number", step: "any", required: true},  
        { label: "Std MP", name: "std_mp", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Working Hours", name: "working_hours_ramp_down", type: "number", required: true },
        { label: "Shift", name: "shift", type: "number", required: true },
        { label: "Operational Loss Working Hours", name: "working_hour_opr", type: "number", required: true },
        { label: "Support DL Prod", name: "support_dl_prod", type: "number", step: "any", required: true },
        { label: "Support DL QA", name: "support_dl_QA", type: "number", step: "any", required: true },
        { label: "Downtime", name: "downtime", type: "number", required: true },
        { label: "MES Downtime", name: "downtime_MES", type: "number", required: true },
        { label: "IT Downtime", name: "downtime_IT", type: "number", required: true }
      ]
    }
  };


  const subsectorsBySector = {
    "Sector 58": ["FAT", "CFC"],
    "Sector 60": ["BE", "SMT", "FATP"],
    "Sector 63": ["All Sections"],
    "Sector 68": ["FATP", "SMT"]
  };

  const customersData = {
    "JIO": { models: ["JIO"], sections: ["FA", "Packing"] },
    "Compal": { models: ["AK3/TG4"], sections: ["CG", "FAT", "CFC"] },
    "Xiaomi": { models: ["C3F2P", "C3F", "C3FP", "C3Z"], sections: ["LDA", "Assy", "Testing", "Packing"] },
    "Acer": { models: ["Acer"], sections: ["FATP"] },
    "Lenovo": { models: ["Lenovo"], sections: ["FAT", "CFC"] }
  };

  const specialSector68SMT = {
  "Moto": {
    models: ["MB", "SB"],
    sections: ["SMT"]
  },
  "Compal": {
    models: ["AK3"],
    sections: ["SMT"]
  },
  "Xiaomi": {
    models: ["C3F2P", "C3FP", "C3Z", "All Models"],
    sections: ["SMT", "SMT - BLT"]
  },
  "Lenovo": {
    models: ["Lenovo"],
    sections: ["SMT"]
  },
  "Oppo": {
    models: [""],
    sections: ["SMT"]
  }
};

const specialSector63 = {
  "LC": {
    models:["Barley","RADO","AL5"],
    sections: ["SMT MB", "SMT SB","SMT FB","BLT MB","Glue MB","Glue SB","FA","Packing"]
  },
  "Alcatel": {
    models: ["Alcatel"],
    sections: ["SMT MB", "SMT SB","SMT FB","BLT MB","Glue MB","Glue SB","FA","Packing"]
  },
};

const specialSector58FAT = {
  "Moto": {
    models:["Cusco +","MALMO24","LAMULITE24","EXPLORER25","Kansas25 NA"],
    sections: ["BE"]
  },
};

const specialSector58CFC = {
  "Moto": {
    models:["Cusco +","MALMO24","LAMULITE24","EXPLORER25","Kansas25 NA"],
    sections: ["CFC"]
  },
};
const specialSector60BE = {
  "Moto": {
    models:["Poplar LTE","HOUSTON25","MANILA24","Milos","Cancun 5G+","Poplar Wifi","FOGO 5G+","Macan5G","VIENNA24","WEBB25","Milos +","EXPLORER25","BOSTON NA","MANAUS5G NA","CANCUN 5G NA","FOGO 5G NA","Glory NA","VEGAS25","Kansas25 NA","Prado NA","WEBB NA","Houston NA"],
    sections: ["BE"]
  },
};
const specialSector60SMT = {
  "Moto": {
    models:["Poplar LTE","Poplar Wifi","LAMULITE24","WEBB25","BOSTON NA","MANAUS5G NA","CANCUN 5G NA","Glory NA","Prado NA","WEBB NA","Houston NA"],
    sections: ["MB","SB"]
  },
};
const specialSector60CFC = {
  "Moto": {
    models:["BOSTON NA","MANAUS5G NA","CANCUN 5G NA","FOGO 5G NA","Glory NA","Kansas25 NA","Prado NA","WEBB NA","Houston NA"],
    sections: ["CFC"]
  },
};

  // DOM Elements
  const loginSection = document.getElementById('login-section');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const sectorSection = document.getElementById('sector-section');
  const sectorForm = document.getElementById('sector-form');
  const sectorSelect = document.getElementById('sector-select');
  const subsectorSelect = document.getElementById('subsector-select');
  const customerModelSection = document.getElementById('customer-model-section');
  const customerForm = document.getElementById('customer-form');
  const customerSelect = document.getElementById('customer-select');
  const modelSelect = document.getElementById('model-select');
  const sectionSelect = document.getElementById('section-select');
  const formSection = document.getElementById('form-section');
  const dataForm = document.getElementById('data-form');
  const formFieldsDiv = document.getElementById('form-fields');
  const selectedSectorSpan = document.getElementById('selected-sector');
  const selectedSubsectorSpan = document.getElementById('selected-subsector');
  const selectedCustomerSpan = document.getElementById('selected-customer');
  const selectedModelSpan = document.getElementById('selected-model');
  const selectedSectionSpan = document.getElementById('selected-section');
  const summarySection = document.getElementById('summary-section');
  const summaryContent = document.getElementById('summary-content');
  const newEntryBtn = document.getElementById('new-entry-btn');
  const messageDiv = document.getElementById('message');

  let currentSector, currentSubsector, currentCustomer, currentModel, currentUser;

  loginForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();
    if (username === "user" && password === "password123") {
      currentUser = username;
      loginSection.classList.add('hidden');
      sectorSection.classList.remove('hidden');
      loginError.textContent = '';
      populateSectorOptions();
    } else {
      loginError.textContent = 'Invalid username or password.';
    }
  });

  function populateSectorOptions() {
    sectorSelect.innerHTML = '<option value="" disabled selected>Select a sector</option>';
    Object.keys(subsectorsBySector).forEach(sector => {
      const opt = document.createElement('option');
      opt.value = sector;
      opt.textContent = sector;
      sectorSelect.appendChild(opt);
    });
    subsectorSelect.innerHTML = '<option value="" disabled selected>Select a subsector</option>';
    subsectorSelect.disabled = true;
  }

  sectorSelect.addEventListener('change', () => {
    const sector = sectorSelect.value;
    subsectorSelect.disabled = false;
    subsectorSelect.innerHTML = '<option value="" disabled selected>Select a subsector</option>';
    subsectorsBySector[sector].forEach(sub => {
      const opt = document.createElement('option');
      opt.value = sub;
      opt.textContent = sub;
      subsectorSelect.appendChild(opt);
    });
  });

  sectorForm.addEventListener('submit', e => {
    e.preventDefault();
    currentSector = sectorSelect.value;
    currentSubsector = subsectorSelect.value;
    if (!currentSector || !currentSubsector) return;
    sectorSection.classList.add('hidden');
    customerModelSection.classList.remove('hidden');
    populateCustomerOptions();
  });

  function populateCustomerOptions() {
  customerSelect.innerHTML = '<option value="" disabled selected>Select a customer</option>';
  modelSelect.innerHTML = '<option value="" disabled selected>Select a Model</option>';
  sectionSelect.innerHTML = '<option value="" disabled selected>Select a Section</option>';
  modelSelect.disabled = true;
  sectionSelect.disabled = true;

  if (currentSector === "Sector 68" && currentSubsector === "SMT") {
    Object.keys(specialSector68SMT).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  } 
  else if (currentSector === "Sector 63" && currentSubsector === "All Sections") {
    Object.keys(specialSector63).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }
  else if (currentSector === "Sector 58" && currentSubsector === "FAT") {
    Object.keys(specialSector58FAT).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }else if (currentSector === "Sector 58" && currentSubsector === "CFC") {
    Object.keys(specialSector58CFC).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }else if (currentSector === "Sector 60" && currentSubsector === "BE") {
    Object.keys(specialSector60BE).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }else if (currentSector === "Sector 60" && currentSubsector === "SMT") {
    Object.keys(specialSector60SMT).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }else if (currentSector === "Sector 60" && currentSubsector === "CFC") {
    Object.keys(specialSector60CFC).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }
  else {
    Object.keys(customersData).forEach(cust => {
      const opt = document.createElement('option');
      opt.value = cust;
      opt.textContent = cust;
      customerSelect.appendChild(opt);
    });
  }
}


  customerSelect.addEventListener('change', () => {
  const customer = customerSelect.value;
  modelSelect.disabled = false;
  modelSelect.innerHTML = '<option value="" disabled selected>Select a Model</option>';
  sectionSelect.innerHTML = '<option value="" disabled selected>Select a Section</option>';
  sectionSelect.disabled = false;

  let models = [], sections = [];

  if (currentSector === "Sector 68" && currentSubsector === "SMT") {
    models = specialSector68SMT[customer]?.models || [];
    sections = specialSector68SMT[customer]?.sections || [];
  } 
  else if (currentSector === "Sector 63" && currentSubsector === "All Sections") {
    models = specialSector63[customer]?.models || [];
    sections = specialSector63[customer]?.sections || [];
  }
  else if (currentSector === "Sector 58" && currentSubsector === "FAT") {
    models = specialSector58FAT[customer]?.models || [];
    sections = specialSector58FAT[customer]?.sections || [];
  }
  else if (currentSector === "Sector 58" && currentSubsector === "CFC") {
    models = specialSector58CFC[customer]?.models || [];
    sections = specialSector58CFC[customer]?.sections || [];
  }
  else if (currentSector === "Sector 60" && currentSubsector === "BE") {
    models = specialSector60BE[customer]?.models || [];
    sections = specialSector60BE[customer]?.sections || [];
  }
  else if (currentSector === "Sector 60" && currentSubsector === "SMT") {
    models = specialSector60SMT[customer]?.models || [];
    sections = specialSector60SMT[customer]?.sections || [];
  }
  else if (currentSector === "Sector 60" && currentSubsector === "CFC") {
    models = specialSector60CFC[customer]?.models || [];
    sections = specialSector60CFC[customer]?.sections || [];
  }
  else {
    models = customersData[customer]?.models || [];
    sections = customersData[customer]?.sections || [];
  }

  models.forEach(model => {
    const opt = document.createElement('option');
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
  });

  sections.forEach(section => {
    const opt = document.createElement('option');
    opt.value = section;
    opt.textContent = section;
    sectionSelect.appendChild(opt);
  });
});

  customerForm.addEventListener('submit', e => {
    e.preventDefault();
    currentCustomer = customerSelect.value;
    currentModel = modelSelect.value;
    const section = sectionSelect.value;
    if (!currentCustomer || !currentModel || !section) return;
    selectedSectorSpan.textContent = currentSector;
    selectedSubsectorSpan.textContent = currentSubsector;
    selectedCustomerSpan.textContent = currentCustomer;
    selectedModelSpan.textContent = currentModel;
    selectedSectionSpan.textContent = section;
    customerModelSection.classList.add('hidden');
    formSection.classList.remove('hidden');
    buildDynamicForm(currentSector, currentSubsector);
  });

  function buildDynamicForm(sector, subsector) {
  formFieldsDiv.innerHTML = '';
  sectorsData[sector][subsector].forEach(field => {
    const label = document.createElement('label');
    label.textContent = field.label;
    const input = document.createElement('input');
    input.name = field.name;
    input.type = field.type;
    input.required = field.required;

    if (field.step) {
      input.step = field.step;
    }

    formFieldsDiv.appendChild(label);
    formFieldsDiv.appendChild(input);
  });
}


  dataForm.addEventListener('submit', e => {
    e.preventDefault();
    if (!currentCustomer || !currentModel || !currentSector || !sectionSelect.value) {
      messageDiv.className = 'message error';
      messageDiv.textContent = 'Missing customer, model, sector, or section!';
      return;
    }
    const raw = new FormData(dataForm);
    const payload = {
      sector: currentSector,
      subsector: currentSubsector,
      customer: currentCustomer,
      model: currentModel,
      section: sectionSelect.value,
    };

    raw.forEach((val, key) => {
      const mappedKey = fieldMap[key] || key;
      payload[mappedKey] = isNaN(val) ? val : Number(val);
    
});



    fetch("http://127.0.0.1:5000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(json => {
        summarySection.classList.remove('hidden');
        formSection.classList.add('hidden');
        messageDiv.className = 'message success';
        messageDiv.textContent = 'Data submitted successfully!';
        summaryContent.textContent = JSON.stringify(json, null, 2);
      })
      .catch(err => {
        messageDiv.className = 'message error';
        messageDiv.textContent = 'Submission failed.';
        console.error(err);
      });
  });

  newEntryBtn.addEventListener('click', () => {
    summarySection.classList.add('hidden');
    sectorSection.classList.remove('hidden');
  });

  document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-btn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      fetch("http://127.0.0.1:5000/download")
        .then(response => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.blob().then(blob => ({ blob, response }));
        })
        .then(({ blob, response }) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;

          const contentDisposition = response.headers.get("Content-Disposition");
          const match = contentDisposition && contentDisposition.match(/filename="(.+)"/);
          a.download = match ? match[1] : "export.xlsx";  // dynamic filename fallback

          document.body.appendChild(a);
          a.click();
          a.remove();
        })
        .catch(err => {
          console.error("Download failed:", err);
          alert("Failed to download the file.");
        });
    });
  }
});

})();
