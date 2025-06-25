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
  ramp_up_eff: 'ramp_up_efficiency',
  ramp_up_line: 'ramp_up_line',
  ramp_up_days: 'ramp_up_days', 
  working_hour_ramp_up: 'working_hour_ramp_up',
  ramp_down_eff: 'ramp_down_efficiency',
  ramp_down_days: 'ramp_down_days',
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
        { label: "Ramp up Efficiency", name: "ramp_up_eff", type: "number", required: true },
        { label: "Ramp up Line", name: "ramp_up_line", type: "number", required: true },
        { label: "Ramp up Days", name: "ramp_up_days", type: "number", required: true },
        { label: "Ramp Up Working Hours", name: "working_hour_ramp_up", type: "number", required: true },
        { label: "Ramp down Efficiency", name: "ramp_down_eff", type: "number", required: true },
        { label: "Ramp down Days", name: "ramp_down_days", type: "number", required: true },
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
  
  let fetchedSectors = {};
  let fetchedCustomers = {};
  let fetchedSections = [];

async function loadCategoriesFromBackend() {
  try {
    const res = await fetch("https://businessplanpadget-production.up.railway.app/get-categories");
    const data = await res.json();
    fetchedSectors = data.sectors;
    fetchedCustomers = data.customers;
    fetchedSections = data.sections;
  } catch (err) {
    console.error("Failed to load categories:", err);
  }
}

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
  Object.keys(fetchedSectors).forEach(sector => {
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
  (fetchedSectors[sector] || []).forEach(sub => {
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
  modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';
  sectionSelect.innerHTML = '<option value="" disabled selected>Select a section</option>';
  modelSelect.disabled = true;
  sectionSelect.disabled = false;

  Object.keys(fetchedCustomers).forEach(customer => {
    const opt = document.createElement('option');
    opt.value = customer;
    opt.textContent = customer;
    customerSelect.appendChild(opt);
  });

  // populate sections globally (not customer-specific)
  fetchedSections.forEach(section => {
    const opt = document.createElement('option');
    opt.value = section;
    opt.textContent = section;
    sectionSelect.appendChild(opt);
  });
}

  customerSelect.addEventListener('change', () => {
  const customer = customerSelect.value;
  modelSelect.disabled = false;
  modelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';

  const models = fetchedCustomers[customer] || [];
  models.forEach(model => {
    const opt = document.createElement('option');
    opt.value = model;
    opt.textContent = model;
    modelSelect.appendChild(opt);
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

const topDownloadBtn = document.getElementById("top-download-btn");
const downloadSection = document.getElementById("download-section");
const sectorDropdown = document.getElementById("sector");
const subsectorDropdown = document.getElementById("subsector");

const subsectorMap = {
  "Sector 58": ["FAT", "CFC"],
  "Sector 60": ["BE", "SMT", "CFC"],
  "Sector 63": ["All Sections"],
  "Sector 68": ["FATP", "SMT"]
};

topDownloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelectorAll("main > section").forEach(sec => sec.classList.add("hidden"));
  downloadSection.classList.remove("hidden");
});

sectorDropdown.addEventListener("change", () => {
  const selected = sectorDropdown.value;
  subsectorDropdown.innerHTML = '<option value="">Select Subsector</option>';
  if (selected in subsectorMap) {
    subsectorMap[selected].forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.textContent = sub;
      subsectorDropdown.appendChild(opt);
    });
    subsectorDropdown.disabled = false;
  } else {
    subsectorDropdown.disabled = true;
  }
});

document.getElementById("download-form").addEventListener("submit", (e) => {
  const sector = sectorDropdown.value;
  const subsector = subsectorDropdown.value;

  if (!sector || !subsector) {
    e.preventDefault();
    alert("Please select both sector and subsector.");
  }
  // Let the form naturally submit via POST to /download-sector-subsector
});

document.getElementById('login-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://127.0.0.1:5000/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  const result = await res.json();
  if (result.status === 'success') {
  await loadCategoriesFromBackend();  

  if (result.role === 'admin') {
    document.getElementById('admin-panel').classList.remove('hidden');
  } else {
    document.getElementById('sector-section').classList.remove('hidden');
    populateSectorOptions();  
  }
  document.getElementById('login-section').classList.add('hidden');
} else {
  document.getElementById('login-error').innerText = result.message;
}

});

async function sendAdminForm(endpoint, data, messageEl) {
  try {
    const res = await fetch(`http://127.0.0.1:5000/admin/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    messageEl.textContent = result.message || "Added successfully!";
  } catch (err) {
    messageEl.textContent = "Error: " + err.message;
  }
}

document.getElementById("add-sector-form").addEventListener("submit", e => {
  e.preventDefault();
  const sector = e.target.sector.value.trim();
  sendAdminForm("add-sector", { name: sector }, document.getElementById("admin-message"));
  e.target.reset();
});

document.getElementById("add-subsector-form").addEventListener("submit", e => {
  e.preventDefault();
  const subsector = e.target.subsector.value.trim();
  const sector = e.target["sector-name"].value.trim();
  sendAdminForm("add-subsector", { name: subsector, sector }, document.getElementById("admin-message"));
  e.target.reset();
});

document.getElementById("add-customer-form").addEventListener("submit", e => {
  e.preventDefault();
  const customer = e.target.customer.value.trim();
  sendAdminForm("add-customer", { name: customer }, document.getElementById("admin-message"));
  e.target.reset();
});

document.getElementById("add-model-form").addEventListener("submit", e => {
  e.preventDefault();
  const model = e.target.model.value.trim();
  const customer = e.target["customer-name"].value.trim();
  sendAdminForm("add-model", { name: model, customer }, document.getElementById("admin-message"));
  e.target.reset();
});

document.getElementById("add-section-form").addEventListener("submit", e => {
  e.preventDefault();
  const section = e.target.section.value.trim();
  sendAdminForm("add-section", { name: section }, document.getElementById("admin-message"));
  e.target.reset();
});

document.getElementById("logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  // Hide all sections and return to login screen
  document.querySelectorAll("main > section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("login-form").reset();

  // Clear any dynamic form fields or messages
  document.getElementById("message").textContent = '';
  document.getElementById("admin-message").textContent = '';
});


})();
