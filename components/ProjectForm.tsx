'use client';

import { ProjectInterface, SessionInterface } from '@/common.type';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import FormField from './FormField';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '@/constants';
import Button from './Button';
import { createNewProject, fetchToken, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      console.log('type', type);
      console.log('project?.id', project?.id);
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }

      if (type === 'edit') {
        await updateProject(form, project?.id as string, token);

        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      return alert('Upload une image');
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange('image', result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    image: project?.image || '',
    title: project?.title || '',
    description: project?.description || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choisis une image pour ton project'}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === 'create' ? true : false}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Image projet"
            fill
          />
        )}
      </div>
      <FormField
        title="Titre"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Partage et découvre des projets de développeurs remarquables"
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type="url"
        title="Site web"
        state={form.liveSiteUrl}
        placeholder="https://flexibble.com"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type="url"
        title="Lien Github"
        state={form.githubUrl}
        placeholder="https://github.com/suzette-sousa"
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu
        title="Catégorie"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />
      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${
                  type === 'create'
                    ? 'En cours de création'
                    : 'En cours de modification'
                }`
              : `${type === 'create' ? 'Créer' : 'Éditer'}`
          }
          type="submit"
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;
