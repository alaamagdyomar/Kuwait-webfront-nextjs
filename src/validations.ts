import { difference, filter, first, flatten, isEmpty, map } from "lodash";
import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup.string().min(6).max(20).required("validation.required"),
  phone_country_code: yup.string().required("validation.required"),
  password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
});

export const verificySchema = yup.object({
  // phone: yup.string().min(6).max(20).required(),
  // phone_country_code: yup.string().required("validation.required"),
  code: yup.string().min(6).max(12).required("validation.required"),
  // type: yup.string().required("validation.required"),
});

export const searchSchema = yup.object({
  search: yup.string().min(3).required(),
});

export const registerSchema = yup.object({
  phone: yup
    .string()
    .min(6, "validation.max")
    .max(20, "validation.max")
    .required("validation.required"),
  phone_country_code: yup
    .string()
    .min(2, "validation.max")
    .required("validation.required"),
  email: yup.string().email(),
  password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
  password_confirmation: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required")
    .oneOf([yup.ref("password")], "validation.password_confirmation"),
});

export const forgotPasswordSchema = yup.object({
  email: yup.string().email().required(),
});

export const updateUserSchema = yup.object({
  email: yup.string().email().required(),
  country_id: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().min(10).max(12).required(),
  role: yup.string().required().oneOf(["company", "visitor"]),
  name: yup
    .object({
      ar: yup.string().required(),
      en: yup.string().required(),
      ru: yup.string().required(),
    })
    .required(),
  caption: yup.object({
    ar: yup.string().required(),
    en: yup.string().required(),
    ru: yup.string().required(),
  }),
  categories: yup.array(),
  address: yup.string().required(),
  keywords: yup.string().nullable(),
  website: yup.string().url().nullable(),
  twitter: yup.string().url().nullable(),
  facebook: yup.string().url().nullable(),
  instagram: yup.string().url().nullable(),
  snap: yup.string().url().nullable(),
  tiktok: yup.string().url().nullable(),
  linked: yup.string().url().nullable(),
  iphone: yup.string().url().nullable(),
  android: yup.string().url().nullable(),
});

export const contactusSchema = yup.object().shape({
  first_name: yup.string().min(2).max(99).required(),
  last_name: yup.string().min(2).max(99).required(),
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(460).required(),
  message: yup.string().required().max(9999),
});

export const addToCartSchema = (originalGroups: any, t: any) => {
  const originalAllChoices = map(
    flatten(
      map(filter(originalGroups, "choices"), "choices")
    ),
    "id"
  );
  const originalRequiredChoices = map(
    flatten(
      map(filter(filter(originalGroups, g => g.selection_type !== 'optional'), "choices"), "choices")
    ),
    "id"
  )
  const originalRequiredGroups = map(
    flatten(
      filter(originalGroups, g => g.selection_type !== 'optional')
    ),
    "id"
  );
  const originalRequiredGroupsByName = map(
    flatten(
      filter(originalGroups, g => g.selection_type !== 'optional')
    ),
  );
  const allOrginalGroups = map(
    flatten(originalGroups),
    "id"
  );
  return yup.lazy((values) => {
    const currentRequiredChoices = map(
      flatten(
        map(filter(filter(values.groups, g => g.selection_type !== 'optional'), "choices"), "choices")
      ),
      "id"
    )
    const currentRequiredGroups = map(
      flatten(
        filter(values.groups, g => g.required)
      ),
      "choice_group_id"
    )
    console.log('values', values)
    return yup.object().shape({
      vendor_id: yup.number().required(t('required', { field: t('vendor') })),
      offer_id: yup.number().required(t('required', { field: t('product') })),
      quantity: yup.number().min(1, t('validation.quantity')).required(t('required', { field: t('quantity') })),
      groups: yup.array().of(yup.object().shape({
        choice_group_id: yup.number().oneOf(allOrginalGroups).when('offer_id', (_, schema) => {
          const remainingRequiredGroups = difference(originalRequiredGroups, currentRequiredGroups);
          // cases are not done :
          // 1- groups with max 2 or 3 (meters)
          const remainingRequiredGroupsByNames = first(filter(originalRequiredGroupsByName, g => g.id === first(remainingRequiredGroups)));
          return originalRequiredGroups.length > currentRequiredGroups.length && !isEmpty(remainingRequiredGroupsByNames) ? schema
            .max(originalRequiredGroups.length, t('validation.group_required_max', { field: remainingRequiredGroupsByNames.name }))
            : schema.optional();
        }),
        choices: yup.array().of(yup.object().shape({
          quantity: yup.number(),
          choice_id: yup.number(),
        }))
      })).when('quantity', (quantity, schema) => {
        // console.log('original', originalRequiredGroups)
        // console.log('current', currentRequiredGroups)
        // console.log('groups of local', quantity);
        // console.log('originalRequiredGroupsByName', originalRequiredGroupsByName)
        // console.log('case of groups', originalRequiredGroups.length !== currentRequiredGroups.length
        const remainingRequiredGroups = difference(originalRequiredGroups, currentRequiredGroups);
        const remainingRequiredGroupsByNames = first(filter(originalRequiredGroupsByName, g => g.id === first(remainingRequiredGroups)));
        return originalRequiredGroups.length !== currentRequiredGroups.length ? schema.required(t('validation.required', { field: remainingRequiredGroupsByNames.name })).length(remainingRequiredGroupsByNames.length, t('validation.group_required_max', { field: remainingRequiredGroupsByNames.name })) : schema.nullable();
      })
    });
  }
  )
};

export const ChangePasswordSchema = yup.object({
  phone: yup
    .string()
    .min(6, "validation.max")
    .max(20, "validation.max")
    .required("validation.required"),
  phone_country_code: yup
    .string()
    .min(2, "validation.max")
    .required("validation.required"),
  new_password: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required"),
  new_password_confirmation: yup
    .string()
    .min(4, "validation.min")
    .max(20, "validation.max")
    .required("validation.required")
    .oneOf([yup.ref("new_password")], "validation.password_confirmation")
});
