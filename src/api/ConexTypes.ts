// pswd_hash is intentionally absent: Supabase Auth owns credentials and the
// hash must never be selected into anything the browser receives.
export type Customer = {
  customer_id: string;
  name: string;
  surname: string;
  email: string;
};

export type Employer = {
  employer_id: string;
  name: string;
  email: string;
};

export type Service = {
  service_id: string;
  name: string;
};

export type TaskStatus = "open" | "in_progress" | "done" | "cancelled";

export type Task = {
  task_id: string;
  customer_id: string;
  service_id: string;
  employer_id: string;
  problem_description: string;
  status: TaskStatus;
  created_at: string;
};
