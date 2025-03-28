variable "subscription_id" {
  description = "El ID de la suscripción de Azure."
  type        = string
}

variable "resource_group_name" {
  description = "Nombre del grupo de recursos"
  type        = string
  default     = "monorepo-rg"
}

variable "location" {
  description = "Ubicación de la infraestructura"
  type        = string
  default     = "East US"
}

variable "aks_cluster_name" {
  description = "Nombre del clúster AKS"
  type        = string
  default     = "monorepo-aks"
}

variable "node_count" {
  description = "Cantidad de nodos en el clúster"
  type        = number
  default     = 2
}

variable "node_vm_size" {
  description = "Tamaño de la VM para los nodos"
  type        = string
  default     = "Standard_DS2_v2"
}

variable "dns_prefix" {
  description = "Prefijo DNS para el clúster AKS"
  type        = string
  default     = "monorepoaks"
}

variable "public_ip_name" {
  description = "Nombre del Public IP para el balanceador de carga"
  type        = string
  default     = "monorepo-public-ip"
}
