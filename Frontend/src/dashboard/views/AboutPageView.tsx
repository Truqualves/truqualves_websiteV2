import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICONS } from '../constants';
import { useAboutPageManagement } from '../hooks/useAboutPageManagement';
import type { BackendAboutPage } from '../types';
import { toast } from 'sonner';

const DEFAULT_ABOUT_CONTENT: BackendAboutPage = {
  story: {
    title: "Built on a Foundation of Trust & Expertise",
    sinceYear: 2008,
    content: [
      "Truqual Validation Expert Services was founded with a singular mission: to help regulated industries navigate the complex landscape of validation and compliance with confidence and precision.",
      "With over 15 years of combined expertise, our team of seasoned validation specialists, quality engineers, and regulatory consultants has successfully supported clients across pharmaceutical, biotech, medical device, and food & beverage industries.",
      "We believe that robust validation is not just a regulatory requirement — it's a competitive advantage."
    ]
  },
  howWeWork: {
    title: "A Partnership, Not a Patchwork",
    subtitle: "Your Trusted Partner in GxP Compliance",
    desc: "We work alongside your team as embedded specialists, delivering audit-ready packages and milestone-driven results that align with your regulatory timelines.",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    items: [
      { icon: "Users", title: "Embedded specialists", desc: "Senior practitioners work alongside your QA, MS&T, and IT teams — not a distant help desk — so knowledge stays with you after the project." },
      { icon: "FileCheck", title: "Audit-ready packages", desc: "Protocols, reports, trace matrices, and risk files structured the way inspectors expect, so reviews focus on science, not paperwork gaps." },
      { icon: "CalendarClock", title: "Milestone-driven delivery", desc: "Clear gates, predictable cadence, and scope control aligned to batch release, filing deadlines, and facility start-up timelines." }
    ]
  },
  mission: {
    title: "Mission",
    desc: "Deliver validation and compliance programs that regulators respect, auditors accept, and your operations can sustain — without slowing innovation.",
    keyPoints: [
      "Regulator-respected validation programs",
      "Audit-ready compliance documentation",
      "Sustainable operational processes",
      "Innovation-friendly approach"
    ]
  },
  vision: {
    title: "Vision",
    desc: "Become the trusted validation partner for regulated manufacturers worldwide: predictable quality, transparent evidence, and long-term GxP maturity.",
    keyPoints: [
      "Global trusted partnership",
      "Predictable quality outcomes",
      "Transparent evidence management",
      "Long-term GxP maturity"
    ]
  },
  values: [
    { icon: "Target", title: "Precision", desc: "Meticulous attention to every protocol, every test, every document because in validation, details save lives." },
    { icon: "CheckCircle", title: "Excellence", desc: "We don't just meet standards — we set them. Every deliverable exceeds regulatory expectations." },
    { icon: "Lightbulb", title: "Innovation", desc: "Adopting the latest frameworks and risk-based approaches to deliver smarter solutions." },
    { icon: "Scale", title: "Integrity", desc: "Transparent, honest, and objective counsel — always in the best interest of the client." }
  ],
  standards: {
    title: "Frameworks We Align With",
    subtitle: "Standards",
    desc: "Every engagement maps to the regulations and guidances your auditors care about — so evidence is consistent from protocol to inspection.",
    items: [
      "FDA 21 CFR Part 11 & Part 211",
      "EU GMP Annex 11 & Annex 15",
      "ICH Q8 / Q9 / Q10 / Q11",
      "GAMP 5 & risk-based CSV",
      "ISO 13485 & 21 CFR Part 820",
      "ALCOA+"
    ]
  },
  milestones: [
    { year: "2008", label: "Founded", text: "Truqual begins supporting pharma and biotech validation programs." }
  ]
};

const ICON_OPTIONS = [
  'Target',
  'ShieldCheck',
  'CheckCircle',
  'Users',
  'FileCheck',
  'CalendarClock',
  'Lightbulb',
  'Scale',
  'Eye',
  'Activity',
  'Wrench',
  'Briefcase',
  'ShieldAlert',
  'BookOpen',
  'Settings'
];

const AboutPageView: React.FC = () => {
  const {
    aboutPage,
    isLoading,
    error,
    fetchAboutPage,
    updateAboutPage,
  } = useAboutPageManagement();

  const [activeTab, setActiveStatus] = useState<'story' | 'mission' | 'values' | 'milestones' | 'standards'>('story');
  const [formData, setFormData] = useState<BackendAboutPage>(DEFAULT_ABOUT_CONTENT);
  const [storyImage, setStoryImage] = useState<File | null>(null);
  const [missionImage, setMissionImage] = useState<File | null>(null);
  const [visionImage, setVisionImage] = useState<File | null>(null);
  const [videoThumbnail, setVideoThumbnail] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAboutPage();
  }, [fetchAboutPage]);

  useEffect(() => {
    if (aboutPage && Object.keys(aboutPage).length > 0) {
      setFormData({
        ...DEFAULT_ABOUT_CONTENT,
        ...aboutPage
      });
    }
  }, [aboutPage]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data = new FormData();
      data.append('data', JSON.stringify(formData));
      
      if (storyImage) data.append('storyImage', storyImage);
      if (missionImage) data.append('missionImage', missionImage);
      if (visionImage) data.append('visionImage', visionImage);
      if (videoThumbnail) data.append('videoThumbnail', videoThumbnail);

      await updateAboutPage(data);
      toast.success('About page updated successfully');
      
      setStoryImage(null);
      setMissionImage(null);
      setVisionImage(null);
      setVideoThumbnail(null);
    } catch (err) {
      toast.error('Failed to save changes');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateNestedField = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData((prev: any) => {
      const next = { ...prev };
      let current = next;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
  };

  if (isLoading && !formData._id) {
    return <div className="flex items-center justify-center h-64"><ICONS.Activity className="animate-spin text-teal-600" /></div>;
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">About Page Content</h2>
          <p className="text-slate-500 text-sm font-medium">Customize the narrative, mission, and milestones of TruQual.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? <ICONS.Activity size={18} className="animate-spin" /> : <ICONS.FileText size={18} />}
          Save Changes
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <div className="bg-white border border-slate-100 p-2 rounded-2xl shadow-sm flex flex-wrap gap-2">
          {[
            { id: 'story', label: 'Company Story', icon: ICONS.BookOpen },
            { id: 'mission', label: 'Mission & Vision', icon: ICONS.ShieldAlert },
            { id: 'values', label: 'Core Values', icon: ICONS.CheckCircle },
            { id: 'milestones', label: 'Milestones', icon: ICONS.Activity },
            { id: 'standards', label: 'Standards', icon: ICONS.Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id as any)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-10 shadow-sm w-full">
          {activeTab === 'story' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <h3 className="text-lg font-bold text-slate-800 border-b pb-4">Our Story Section</h3>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Headline</label>
                  <input 
                    type="text" 
                    value={formData.story?.title || ''} 
                    onChange={(e) => updateNestedField('story.title', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Founded Year</label>
                    <input 
                      type="number" 
                      value={formData.story?.sinceYear || ''} 
                      onChange={(e) => updateNestedField('story.sinceYear', parseInt(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Story Image</label>
                    <input 
                      type="file" 
                      onChange={(e) => setStoryImage(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100" 
                    />
                    {formData.story?.image && !storyImage && (
                      <p className="text-[10px] text-teal-600 truncate mt-1">Current: {formData.story.image}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <label className="text-sm font-semibold text-slate-700">Company Narrative Paragraphs</label>
                    <button 
                      onClick={() => {
                        const items = [...(formData.story?.content || []), ''];
                        updateNestedField('story.content', items);
                      }}
                      className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                    >
                      <ICONS.Plus size={14} /> Add Paragraph
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(formData.story?.content || []).map((p, i) => (
                      <div key={i} className="relative group">
                        <textarea 
                          rows={3}
                          value={p}
                          onChange={(e) => {
                            const items = [...(formData.story!.content)];
                            items[i] = e.target.value;
                            updateNestedField('story.content', items);
                          }}
                          placeholder="Enter paragraph text..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10 resize-none" 
                        />
                        <button 
                          onClick={() => {
                            const items = (formData.story?.content || []).filter((_, idx) => idx !== i);
                            updateNestedField('story.content', items);
                          }}
                          className="absolute right-2 top-2 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ICONS.X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 border-b pb-4 pt-4">How We Work Section</h3>
              <div className="grid gap-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Section Title</label>
                      <input 
                        type="text" 
                        value={formData.howWeWork?.title || ''} 
                        onChange={(e) => updateNestedField('howWeWork.title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Section Subtitle</label>
                      <input 
                        type="text" 
                        value={formData.howWeWork?.subtitle || ''} 
                        onChange={(e) => updateNestedField('howWeWork.subtitle', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                      />
                    </div>
                 </div>
                 <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.howWeWork?.desc || ''} 
                    onChange={(e) => updateNestedField('howWeWork.desc', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" 
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Video URL</label>
                      <input 
                        type="text" 
                        value={formData.howWeWork?.videoLink || ''} 
                        onChange={(e) => updateNestedField('howWeWork.videoLink', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Video Thumbnail</label>
                      <input 
                        type="file" 
                        onChange={(e) => setVideoThumbnail(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-50 file:text-teal-700" 
                      />
                    </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-sm font-bold text-slate-700">Partnership Points (Items)</h4>
                    <button 
                      onClick={() => {
                        const items = [...(formData.howWeWork?.items || []), { icon: 'Users', title: '', desc: '' }];
                        updateNestedField('howWeWork.items', items);
                      }}
                      className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                    >
                      <ICONS.Plus size={14} /> Add Item
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    {(formData.howWeWork?.items || []).map((item, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                        <button 
                          onClick={() => {
                            const items = (formData.howWeWork?.items || []).filter((_, idx) => idx !== i);
                            updateNestedField('howWeWork.items', items);
                          }}
                          className="absolute top-2 right-2 p-1 bg-white rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-rose-100"
                        >
                          <ICONS.X size={12} />
                        </button>
                        <div className="space-y-2">
                          <input 
                            type="text" 
                            placeholder="Title"
                            value={item.title}
                            onChange={(e) => {
                              const items = [...(formData.howWeWork!.items)];
                              items[i] = { ...items[i], title: e.target.value };
                              updateNestedField('howWeWork.items', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold outline-none"
                          />
                          <textarea 
                            placeholder="Description"
                            rows={3}
                            value={item.desc}
                            onChange={(e) => {
                              const items = [...(formData.howWeWork!.items)];
                              items[i] = { ...items[i], desc: e.target.value };
                              updateNestedField('howWeWork.items', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] outline-none resize-none"
                          />
                          <select 
                            value={item.icon}
                            onChange={(e) => {
                              const items = [...(formData.howWeWork!.items)];
                              items[i] = { ...items[i], icon: e.target.value };
                              updateNestedField('howWeWork.items', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-[10px] outline-none"
                          >
                            {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mission' && (
            <div className="space-y-12 animate-in fade-in duration-300">
               <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 border-b pb-4 flex items-center gap-2">
                    <ICONS.Target className="text-teal-600" size={20} /> Mission
                  </h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Headline</label>
                      <input 
                        type="text" 
                        value={formData.mission?.title || ''} 
                        onChange={(e) => updateNestedField('mission.title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Description</label>
                      <textarea 
                        rows={3}
                        value={formData.mission?.desc || ''} 
                        onChange={(e) => updateNestedField('mission.desc', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" 
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="text-sm font-semibold text-slate-700">Strategic Mission Objectives</label>
                        <button 
                          onClick={() => {
                            const items = [...(formData.mission?.keyPoints || []), ''];
                            updateNestedField('mission.keyPoints', items);
                          }}
                          className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                        >
                          <ICONS.Plus size={14} /> Add Objective
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {(formData.mission?.keyPoints || []).map((kp, i) => (
                          <div key={i} className="relative group">
                            <input 
                              type="text" 
                              value={kp}
                              onChange={(e) => {
                                const items = [...(formData.mission!.keyPoints)];
                                items[i] = e.target.value;
                                updateNestedField('mission.keyPoints', items);
                              }}
                              placeholder="e.g. Audit-ready compliance"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10" 
                            />
                            <button 
                              onClick={() => {
                                const items = (formData.mission?.keyPoints || []).filter((_, idx) => idx !== i);
                                updateNestedField('mission.keyPoints', items);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <ICONS.X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Mission Image</label>
                      <input 
                        type="file" 
                        onChange={(e) => setMissionImage(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-50 file:text-teal-700" 
                      />
                    </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 border-b pb-4 flex items-center gap-2">
                    <ICONS.Eye className="text-teal-600" size={20} /> Vision
                  </h3>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Headline</label>
                      <input 
                        type="text" 
                        value={formData.vision?.title || ''} 
                        onChange={(e) => updateNestedField('vision.title', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Description</label>
                      <textarea 
                        rows={3}
                        value={formData.vision?.desc || ''} 
                        onChange={(e) => updateNestedField('vision.desc', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" 
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-2">
                        <label className="text-sm font-semibold text-slate-700">Strategic Vision Objectives</label>
                        <button 
                          onClick={() => {
                            const items = [...(formData.vision?.keyPoints || []), ''];
                            updateNestedField('vision.keyPoints', items);
                          }}
                          className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                        >
                          <ICONS.Plus size={14} /> Add Objective
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        {(formData.vision?.keyPoints || []).map((kp, i) => (
                          <div key={i} className="relative group">
                            <input 
                              type="text" 
                              value={kp}
                              onChange={(e) => {
                                const items = [...(formData.vision!.keyPoints)];
                                items[i] = e.target.value;
                                updateNestedField('vision.keyPoints', items);
                              }}
                              placeholder="e.g. Global trusted partnership"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10" 
                            />
                            <button 
                              onClick={() => {
                                const items = (formData.vision?.keyPoints || []).filter((_, idx) => idx !== i);
                                updateNestedField('vision.keyPoints', items);
                              }}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <ICONS.X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Vision Image</label>
                      <input 
                        type="file" 
                        onChange={(e) => setVisionImage(e.target.files?.[0] || null)}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-50 file:text-teal-700" 
                      />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'values' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-bold text-slate-800">Core Values</h3>
                  <button 
                    onClick={() => {
                      const items = [...(formData.values || []), { icon: 'Target', title: '', desc: '' }];
                      updateNestedField('values', items);
                    }}
                    className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    <ICONS.Plus size={14} /> Add Value
                  </button>
               </div>
               <div className="grid md:grid-cols-2 gap-4">
                  {(formData.values || []).map((v, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                       <button 
                        onClick={() => {
                          const items = (formData.values || []).filter((_, idx) => idx !== i);
                          updateNestedField('values', items);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-rose-100"
                       >
                        <ICONS.X size={14} />
                       </button>
                       <div className="space-y-3">
                          <input 
                            type="text" 
                            placeholder="Title"
                            value={v.title}
                            onChange={(e) => {
                              const items = [...(formData.values || [])];
                              items[i] = { ...items[i], title: e.target.value };
                              updateNestedField('values', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none"
                          />
                          <textarea 
                            placeholder="Description"
                            rows={2}
                            value={v.desc}
                            onChange={(e) => {
                              const items = [...(formData.values || [])];
                              items[i] = { ...items[i], desc: e.target.value };
                              updateNestedField('values', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none resize-none"
                          />
                           <select 
                            value={v.icon}
                            onChange={(e) => {
                              const items = [...(formData.values || [])];
                              items[i] = { ...items[i], icon: e.target.value };
                              updateNestedField('values', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none"
                          >
                            {ICON_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'milestones' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="text-lg font-bold text-slate-800">Timeline Milestones</h3>
                  <button 
                    onClick={() => {
                      const items = [...(formData.milestones || []), { year: '', label: '', text: '' }];
                      updateNestedField('milestones', items);
                    }}
                    className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    <ICONS.Plus size={14} /> Add Milestone
                  </button>
               </div>
               <div className="space-y-4">
                  {(formData.milestones || []).map((m, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4 items-start relative group">
                        <button 
                          onClick={() => {
                            const items = (formData.milestones || []).filter((_, idx) => idx !== i);
                            updateNestedField('milestones', items);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-rose-100"
                        >
                          <ICONS.X size={14} />
                        </button>
                        <div className="w-full md:w-32 space-y-2">
                           <label className="text-[10px] font-bold text-slate-400 uppercase">Year</label>
                           <input 
                            type="text" 
                            value={m.year}
                            onChange={(e) => {
                              const items = [...(formData.milestones || [])];
                              items[i] = { ...items[i], year: e.target.value };
                              updateNestedField('milestones', items);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-bold outline-none"
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Label</label>
                            <input 
                              type="text" 
                              value={m.label}
                              onChange={(e) => {
                                const items = [...(formData.milestones || [])];
                                items[i] = { ...items[i], label: e.target.value };
                                updateNestedField('milestones', items);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold outline-none"
                            />
                        </div>
                        <div className="flex-[2] space-y-2 w-full">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Description</label>
                            <textarea 
                              rows={2}
                              value={m.text}
                              onChange={(e) => {
                                const items = [...(formData.milestones || [])];
                                items[i] = { ...items[i], text: e.target.value };
                                updateNestedField('milestones', items);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs outline-none resize-none"
                            />
                        </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTab === 'standards' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <h3 className="text-lg font-bold text-slate-800 border-b pb-4">Compliance Standards</h3>
               <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Section Label</label>
                    <input 
                      type="text" 
                      value={formData.standards?.subtitle || ''} 
                      onChange={(e) => updateNestedField('standards.subtitle', e.target.value)}
                      placeholder="e.g. Standards"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Headline</label>
                    <input 
                      type="text" 
                      value={formData.standards?.title || ''} 
                      onChange={(e) => updateNestedField('standards.title', e.target.value)}
                      placeholder="e.g. Frameworks We Align With"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea 
                    rows={3}
                    value={formData.standards?.desc || ''} 
                    onChange={(e) => updateNestedField('standards.desc', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" 
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <label className="text-sm font-semibold text-slate-700">Global Regulatory Standards</label>
                    <button 
                      onClick={() => {
                        const items = [...(formData.standards?.items || []), ''];
                        updateNestedField('standards.items', items);
                      }}
                      className="text-teal-600 text-xs font-bold hover:underline flex items-center gap-1"
                    >
                      <ICONS.Plus size={14} /> Add Standard
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {(formData.standards?.items || []).map((item, i) => (
                      <div key={i} className="relative group">
                        <input 
                          type="text" 
                          value={item}
                          onChange={(e) => {
                            const items = [...(formData.standards!.items)];
                            items[i] = e.target.value;
                            updateNestedField('standards.items', items);
                          }}
                          placeholder="e.g. FDA 21 CFR Part 11"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 pr-10" 
                        />
                        <button 
                          onClick={() => {
                            const items = (formData.standards?.items || []).filter((_, idx) => idx !== i);
                            updateNestedField('standards.items', items);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <ICONS.X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">These will appear as rounded badges on the About page.</p>
                </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPageView;
