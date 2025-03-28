output "resource_group_name" {
  description = "Nombre del grupo de recursos"
  value       = azurerm_resource_group.rg.name
}

output "aks_cluster_name" {
  description = "Nombre del clúster AKS"
  value       = azurerm_kubernetes_cluster.aks.name
}

output "kube_config" {
  description = "Contenido del kubeconfig para conectarse al clúster"
  value       = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive   = true
}

output "ingress_public_ip" {
  description = "IP pública del balanceador (si se creó)"
  value       = azurerm_public_ip.ingress_ip.ip_address
}
