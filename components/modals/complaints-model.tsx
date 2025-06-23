"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, MapPin, FileText, Calendar } from "lucide-react";

interface ComplaintData {
  id?: string;
  user_id?: string;
  full_name: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  contact_mode: string;
  problem_category: string;
  constituency: string;
  mandal_village: string;
  location: string;
  problem_description: string;
  supporting_documents: string;
  problem_date: string;
  reported_before: string;
  report_details: string;
  specific_authority: string;
  similar_issues: string;
  similar_issues_details: string;
  auth_name: string;
  auth_phone: string;
  auth_email: string;
  leader_photo: string;
  submitted_at: string;
  status?: string;
}

interface ComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  complaintData?: ComplaintData;
  onSave?: (data: ComplaintData) => void;
}

export function ComplaintModal({
  isOpen,
  onClose,
  mode,
  complaintData,
  onSave,
}: ComplaintModalProps) {
  const [formData, setFormData] = useState<ComplaintData>({
    full_name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    contact_mode: "",
    problem_category: "",
    constituency: "",
    mandal_village: "",
    location: "",
    problem_description: "",
    supporting_documents: "",
    problem_date: "",
    reported_before: "",
    report_details: "",
    specific_authority: "",
    similar_issues: "",
    similar_issues_details: "",
    auth_name: "",
    auth_phone: "",
    auth_email: "",
    leader_photo: "",
    submitted_at: new Date().toISOString().split("T")[0],
    status: "Pending",
  });

  useEffect(() => {
    if (complaintData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...complaintData,
        full_name: complaintData.full_name ?? "",
        age: complaintData.age?.toString() ?? "",
        gender:
          complaintData.gender && typeof complaintData.gender === "string"
            ? complaintData.gender
                .split("/")[0] // Take only the part before the slash
                .trim()
                .charAt(0)
                .toUpperCase() +
              complaintData.gender.split("/")[0].trim().slice(1).toLowerCase()
            : "",
        phone: complaintData.phone ?? "",
        email: complaintData.email ?? "",
        address: complaintData.address ?? "",
        contact_mode: complaintData.contact_mode ?? "",
        problem_category: complaintData.problem_category ?? "",
        constituency: complaintData.constituency ?? "",
        mandal_village: complaintData.mandal_village ?? "",
        location: complaintData.location ?? "",
        problem_description: complaintData.problem_description ?? "",
        supporting_documents: complaintData.supporting_documents ?? "",
        problem_date:
          complaintData.problem_date &&
          /^\d{4}-\d{2}-\d{2}$/.test(complaintData.problem_date)
            ? complaintData.problem_date
            : complaintData.problem_date &&
              !isNaN(Date.parse(complaintData.problem_date))
            ? new Date(complaintData.problem_date).toISOString().split("T")[0]
            : "",
        reported_before: complaintData.reported_before ?? "",
        report_details: complaintData.report_details ?? "",
        specific_authority: complaintData.specific_authority ?? "",
        similar_issues: complaintData.similar_issues ?? "",
        similar_issues_details: complaintData.similar_issues_details ?? "",
        auth_name: complaintData.auth_name ?? "",
        auth_phone: complaintData.auth_phone ?? "",
        auth_email: complaintData.auth_email ?? "",
        leader_photo: complaintData.leader_photo ?? "",
        submitted_at:
          complaintData.submitted_at &&
          /^\d{4}-\d{2}-\d{2}/.test(complaintData.submitted_at)
            ? complaintData.submitted_at.split("T")[0]
            : complaintData.submitted_at &&
              !isNaN(Date.parse(complaintData.submitted_at))
            ? new Date(complaintData.submitted_at).toISOString().split("T")[0]
            : "",
        status: complaintData.status ?? "Pending",
      });
    } else if (mode === "add") {
      setFormData({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        contact_mode: "",
        problem_category: "",
        constituency: "",
        mandal_village: "",
        location: "",
        problem_description: "",
        supporting_documents: "",
        problem_date: "",
        reported_before: "",
        report_details: "",
        specific_authority: "",
        similar_issues: "",
        similar_issues_details: "",
        auth_name: "",
        auth_phone: "",
        auth_email: "",
        leader_photo: "",
        submitted_at: new Date().toISOString().split("T")[0],
        status: "Pending",
      });
    }
  }, [complaintData, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add New Complaint"
      : mode === "edit"
      ? "Edit Complaint"
      : "Complaint Details";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Contact Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Mode
            </label>
            <input
              type="text"
              name="contact_mode"
              value={formData.contact_mode}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Problem Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Problem Category
            </label>
            <input
              type="text"
              name="problem_category"
              value={formData.problem_category}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Constituency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Constituency
            </label>
            <input
              type="text"
              name="constituency"
              value={formData.constituency}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Mandal/Village */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mandal/Village
            </label>
            <input
              type="text"
              name="mandal_village"
              value={formData.mandal_village}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Problem Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Date
            </label>
            <input
              type="date"
              name="problem_date"
              value={formData.problem_date}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Supporting Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supporting Documents (URL)
            </label>
            <input
              type="text"
              name="supporting_documents"
              value={formData.supporting_documents}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Paste file URL"
            />
          </div>
          {/* Reported Before */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reported Before
            </label>
            <input
              type="text"
              name="reported_before"
              value={formData.reported_before}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Report Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Details
            </label>
            <input
              type="text"
              name="report_details"
              value={formData.report_details}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Specific Authority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Authority
            </label>
            <input
              type="text"
              name="specific_authority"
              value={formData.specific_authority}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Similar Issues */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Similar Issues
            </label>
            <input
              type="text"
              name="similar_issues"
              value={formData.similar_issues}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Similar Issues Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Similar Issues Details
            </label>
            <input
              type="text"
              name="similar_issues_details"
              value={formData.similar_issues_details}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Authority Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authority Name
            </label>
            <input
              type="text"
              name="auth_name"
              value={formData.auth_name}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Authority Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authority Phone
            </label>
            <input
              type="text"
              name="auth_phone"
              value={formData.auth_phone}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Authority Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authority Email
            </label>
            <input
              type="email"
              name="auth_email"
              value={formData.auth_email}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
          {/* Leader Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leader Photo (URL)
            </label>
            <input
              type="text"
              name="leader_photo"
              value={formData.leader_photo}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Paste file URL"
            />
          </div>
          {/* Submitted Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Submitted Date
            </label>
            <input
              type="date"
              name="submitted_at"
              value={formData.submitted_at}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        {/* Problem Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Problem Description
          </label>
          <textarea
            name="problem_description"
            value={formData.problem_description}
            onChange={handleChange}
            readOnly={isReadOnly}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
            placeholder="Describe the problem in detail..."
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isReadOnly}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700 text-white"
            >
              {mode === "add" ? "Add Complaint" : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
}
