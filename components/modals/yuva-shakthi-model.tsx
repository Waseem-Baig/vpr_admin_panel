"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/model";
import { Button } from "@/components/ui/button";
import {
  User,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Briefcase,
} from "lucide-react";

interface YuvaShakthiData {
  id?: string;
  user_id?: string;
  fullname: string;
  parentname: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  village: string;
  mandal: string;
  constituency: string;
  district: string;
  education: string;
  stream: string;
  occupation: string;
  skills: string;
  interests: string[];
  interest_other: string;
  why: string;
  submitted_at: string;
}

interface YuvaShakthiModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  memberData?: YuvaShakthiData;
  onSave?: (data: YuvaShakthiData) => void;
}

const interestOptions = [
  "Sports",
  "Music",
  "Art",
  "Technology",
  "Politics",
  "Social Service",
  "Entrepreneurship",
  "Other",
];

export function YuvaShakthiModal({
  isOpen,
  onClose,
  mode,
  memberData,
  onSave,
}: YuvaShakthiModalProps) {
  const [formData, setFormData] = useState<YuvaShakthiData>({
    fullname: "",
    parentname: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    village: "",
    mandal: "",
    constituency: "",
    district: "",
    education: "",
    stream: "",
    occupation: "",
    skills: "",
    interests: [],
    interest_other: "",
    why: "",
    submitted_at: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (memberData && (mode === "edit" || mode === "view")) {
      setFormData({
        ...memberData,
        dob:
          memberData.dob && /^\d{4}-\d{2}-\d{2}$/.test(memberData.dob)
            ? memberData.dob
            : memberData.dob && !isNaN(Date.parse(memberData.dob))
            ? new Date(memberData.dob).toISOString().split("T")[0]
            : "",
        submitted_at:
          memberData.submitted_at &&
          /^\d{4}-\d{2}-\d{2}/.test(memberData.submitted_at)
            ? memberData.submitted_at.split("T")[0]
            : memberData.submitted_at &&
              !isNaN(Date.parse(memberData.submitted_at))
            ? new Date(memberData.submitted_at).toISOString().split("T")[0]
            : "",
        interests: Array.isArray(memberData.interests)
          ? memberData.interests
          : [],
        gender:
          memberData.gender && typeof memberData.gender === "string"
            ? memberData.gender.charAt(0).toUpperCase() +
              memberData.gender.slice(1).toLowerCase()
            : "",
      });
    } else if (mode === "add") {
      setFormData({
        fullname: "",
        parentname: "",
        dob: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        village: "",
        mandal: "",
        constituency: "",
        district: "",
        education: "",
        stream: "",
        occupation: "",
        skills: "",
        interests: [],
        interest_other: "",
        why: "",
        submitted_at: new Date().toISOString().split("T")[0],
      });
    }
  }, [memberData, mode]);

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
    const { name, value, type } = e.target;
    if (type === "checkbox" && name === "interests") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        const interests = new Set(prev.interests);
        if (checked) {
          interests.add(value);
        } else {
          interests.delete(value);
        }
        return { ...prev, interests: Array.from(interests) };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const isReadOnly = mode === "view";
  const title =
    mode === "add"
      ? "Add New Member"
      : mode === "edit"
      ? "Edit Member"
      : "Member Details";

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
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Parent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Name
            </label>
            <input
              type="text"
              name="parentname"
              value={formData.parentname}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter parent name"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              required
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
              required
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
              placeholder="+91 9876543210"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="email@example.com"
              required
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
              placeholder="Enter address"
              required
            />
          </div>

          {/* Village */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Village
            </label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter village"
              required
            />
          </div>

          {/* Mandal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mandal
            </label>
            <input
              type="text"
              name="mandal"
              value={formData.mandal}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter mandal"
              required
            />
          </div>

          {/* Constituency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Constituency
            </label>
            <input
              type="text"
              name="constituency"
              value={formData.constituency}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter constituency"
              required
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter district"
              required
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <GraduationCap className="w-4 h-4 inline mr-2" />
              Education
            </label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter education"
              required
            />
          </div>

          {/* Stream */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream
            </label>
            <input
              type="text"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter stream"
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-2" />
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter occupation"
              required
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Enter skills (comma separated)"
            />
          </div>

          {/* Interests (checkbox group) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interests
            </label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    name="interests"
                    value={interest}
                    checked={formData.interests.includes(interest)}
                    onChange={handleChange}
                    disabled={isReadOnly}
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Other Interest */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Other Interest
            </label>
            <input
              type="text"
              name="interest_other"
              value={formData.interest_other}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Specify other interest"
            />
          </div>

          {/* Why */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Why do you want to join?
            </label>
            <textarea
              name="why"
              value={formData.why}
              onChange={handleChange}
              readOnly={isReadOnly}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="Tell us why you want to join"
              rows={3}
              required
            />
          </div>

          {/* Joined Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Joined Date
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

        {/* Action Buttons */}
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:yellow-700 text-white"
            >
              {mode === "add" ? "Add Member" : "Save Changes"}
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
